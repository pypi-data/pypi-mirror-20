"""
dropq functions used by TaxBrain to call Tax-Calculator.
"""
# CODING-STYLE CHECKS:
# pep8 --ignore=E402 behavior.py
# pylint --disable=locally-disabled behavior.py

from __future__ import print_function
import time
import hashlib
import numpy as np
from pandas import DataFrame
import pandas as pd
from .dropq_utils import create_dropq_difference_table as dropq_diff_table
from .dropq_utils import create_dropq_distribution_table as dropq_dist_table
from .dropq_utils import (WEBAPP_INCOME_BINS,
                          add_income_bins,
                          add_weighted_income_bins,
                          create_distribution_table,
                          create_json_table)
from .. import (Calculator, Growfactors, Records,
                Policy, Consumption, Behavior, Growdiff,
                proportional_change_gdp,
                TABLE_LABELS, TABLE_COLUMNS, STATS_COLUMNS)


# specify constants
PLAN_COLUMN_TYPES = [float] * len(TABLE_LABELS)

DIFF_COLUMN_TYPES = [int, int, int, float, float, str, str, str]

DECILE_ROW_NAMES = ['perc0-10', 'perc10-20', 'perc20-30', 'perc30-40',
                    'perc40-50', 'perc50-60', 'perc60-70', 'perc70-80',
                    'perc80-90', 'perc90-100', 'all']

BIN_ROW_NAMES = ['less_than_10', 'ten_twenty', 'twenty_thirty', 'thirty_forty',
                 'forty_fifty', 'fifty_seventyfive', 'seventyfive_hundred',
                 'hundred_twohundred', 'twohundred_fivehundred',
                 'fivehundred_thousand', 'thousand_up', 'all']

TOTAL_ROW_NAMES = ['ind_tax', 'payroll_tax', 'combined_tax']

GDP_ELAST_ROW_NAMES = ['gdp_elasticity']

OGUSA_ROW_NAMES = ['GDP', 'Consumption', 'Investment', 'Hours Worked',
                   'Wages', 'Interest Rates', 'Total Taxes']

NUM_YEARS_DEFAULT = 1


def check_user_mods(user_mods):
    """
    Ensure specified user_mods is properly structured.
    """
    if not isinstance(user_mods, dict):
        raise ValueError('user_mods is not a dictionary')
    actual_keys = set(list(user_mods.keys()))
    expected_keys = set(['policy', 'consumption', 'behavior',
                         'growdiff_baseline', 'growdiff_response',
                         'gdp_elasticity'])
    missing_keys = expected_keys - actual_keys
    if len(missing_keys) > 0:
        raise ValueError('user_mods has missing keys: {}'.format(missing_keys))
    extra_keys = actual_keys - expected_keys
    if len(extra_keys) > 0:
        raise ValueError('user_mods has extra keys: {}'.format(extra_keys))


def random_seed(user_mods):
    """
    Compute random seed based on specified user_mods, which is a
    dictionary returned by the Calculator.read_json_parameter_files()
    function with an extra key:value pair that is specified as
    'gdp_elasticity': {'value': <float_value>}.
    """
    ans = 0
    for subdict_name in user_mods:
        if subdict_name != 'gdp_elasticity':
            ans += random_seed_from_subdict(user_mods[subdict_name])
    return ans % np.iinfo(np.uint32).max  # pylint: disable=no-member


def random_seed_from_subdict(subdict):
    """
    Compute random seed from one user_mods subdictionary
    """
    all_vals = []
    for year in sorted(subdict.keys()):
        all_vals.append(str(year))
        params = subdict[year]
        for param in sorted(params.keys()):
            try:
                tple = tuple(params[param])
            except TypeError:
                # params[param] is not an iterable value; make it so
                tple = tuple((params[param],))
            all_vals.append(str((param, tple)))
    txt = u''.join(all_vals).encode('utf-8')
    hsh = hashlib.sha512(txt)
    seed = int(hsh.hexdigest(), 16)
    return seed % np.iinfo(np.uint32).max  # pylint: disable=no-member


def chooser(agg):
    """
    This is a transformation function that should be called on each group.
    It is assumed that the chunk 'agg' is a chunk of the 'mask' column.
    This chooser selects three of those mask indices with the output for
    those three indices being zero and the output for all the other indices
    being one.
    """
    indices = np.where(agg)
    three = 3
    if len(indices[0]) >= three:
        choices = np.random.choice(indices[0],  # pylint: disable=no-member
                                   size=three, replace=False)
    else:
        msg = ('Not enough differences in taxable income when adding '
               'one dollar for chunk with name: {}')
        raise ValueError(msg.format(agg.name))
    ans = [1] * len(agg)
    for idx in choices:
        ans[idx] = 0
    return ans


def drop_records(df1, df2, mask):
    """
    Modify datasets df1 and df2 by adding statistical 'fuzz'.
    df1 is the standard plan X and X'
    df2 is the user-specified plan (Plan Y)
    mask is the boolean mask where X and X' match
    This function groups both datasets based on the web application's
    income groupings (both weighted decile and income bins), and then
    pseudo-randomly picks three records to 'drop' within each bin.
    We keep track of the three dropped records in both group-by
    strategies and then use these 'flag' columns to modify all
    columns of interest, creating new '*_dec' columns for later
    statistics based on weighted deciles and '*_bin' columns
    for statitistics based on grouping by income bins.
    in each bin in two group-by actions. Lastly we calculate
    individual income tax differences, payroll tax differences, and
    combined tax differences between the baseline and reform
    for the two groupings.
    """
    # perform all statistics on (Y + X') - X

    # Group first
    df2['mask'] = mask
    df1['mask'] = mask

    df2 = add_weighted_income_bins(df2)
    df1 = add_weighted_income_bins(df1)
    gp2_dec = df2.groupby('bins')

    income_bins = WEBAPP_INCOME_BINS

    df2 = add_income_bins(df2, bins=income_bins)
    df1 = add_income_bins(df1, bins=income_bins)
    gp2_bin = df2.groupby('bins')

    # Transform to get the 'flag' column (3 choices to drop in each bin)
    df2['flag_dec'] = gp2_dec['mask'].transform(chooser)
    df2['flag_bin'] = gp2_bin['mask'].transform(chooser)

    # first calculate all of X'
    columns_to_make_noisy = set(TABLE_COLUMNS) | set(STATS_COLUMNS)
    # these don't exist yet
    columns_to_make_noisy.remove('num_returns_ItemDed')
    columns_to_make_noisy.remove('num_returns_StandardDed')
    columns_to_make_noisy.remove('num_returns_AMT')
    for col in columns_to_make_noisy:
        df2[col + '_dec'] = (df2[col] * df2['flag_dec'] -
                             df1[col] * df2['flag_dec'] + df1[col])
        df2[col + '_bin'] = (df2[col] * df2['flag_bin'] -
                             df1[col] * df2['flag_bin'] + df1[col])

    # Difference in plans
    # Positive values are the magnitude of the tax increase
    # Negative values are the magnitude of the tax decrease
    df2['tax_diff_dec'] = df2['_iitax_dec'] - df1['_iitax']
    df2['tax_diff_bin'] = df2['_iitax_bin'] - df1['_iitax']
    df2['payrolltax_diff_dec'] = df2['_payrolltax_dec'] - df1['_payrolltax']
    df2['payrolltax_diff_bin'] = df2['_payrolltax_bin'] - df1['_payrolltax']
    df2['combined_diff_dec'] = df2['_combined_dec'] - df1['_combined']
    df2['combined_diff_bin'] = df2['_combined_bin'] - df1['_combined']

    return df1, df2


def groupby_means_and_comparisons(df1, df2, mask):
    """
    df1 is the standard plan X and X'
    df2 is the user-specified plan (Plan Y)
    mask is the boolean mask where X and X' match
    """
    # pylint: disable=too-many-locals,invalid-name

    df1, df2 = drop_records(df1, df2, mask)

    # Totals for diff between baseline and reform
    dec_sum = (df2['tax_diff_dec'] * df2['s006']).sum()
    bin_sum = (df2['tax_diff_bin'] * df2['s006']).sum()
    pr_dec_sum = (df2['payrolltax_diff_dec'] * df2['s006']).sum()
    pr_bin_sum = (df2['payrolltax_diff_bin'] * df2['s006']).sum()
    combined_dec_sum = (df2['combined_diff_dec'] * df2['s006']).sum()
    combined_bin_sum = (df2['combined_diff_bin'] * df2['s006']).sum()

    # Totals for baseline
    sum_baseline = (df1['_iitax'] * df1['s006']).sum()
    pr_sum_baseline = (df1['_payrolltax'] * df1['s006']).sum()
    combined_sum_baseline = (df1['_combined'] * df1['s006']).sum()

    # Totals for reform
    sum_reform = (df2['_iitax_dec'] * df2['s006']).sum()
    pr_sum_reform = (df2['_payrolltax_dec'] * df2['s006']).sum()
    combined_sum_reform = (df2['_combined_dec'] * df2['s006']).sum()

    # Totals for reform

    # Create Difference tables, grouped by deciles and bins
    diffs_dec = dropq_diff_table(df1, df2,
                                 groupby='weighted_deciles',
                                 res_col='tax_diff',
                                 diff_col='_iitax',
                                 suffix='_dec', wsum=dec_sum)

    diffs_bin = dropq_diff_table(df1, df2,
                                 groupby='webapp_income_bins',
                                 res_col='tax_diff',
                                 diff_col='_iitax',
                                 suffix='_bin', wsum=bin_sum)

    pr_diffs_dec = dropq_diff_table(df1, df2,
                                    groupby='weighted_deciles',
                                    res_col='payrolltax_diff',
                                    diff_col='_payrolltax',
                                    suffix='_dec', wsum=pr_dec_sum)

    pr_diffs_bin = dropq_diff_table(df1, df2,
                                    groupby='webapp_income_bins',
                                    res_col='payrolltax_diff',
                                    diff_col='_payrolltax',
                                    suffix='_bin', wsum=pr_bin_sum)

    comb_diffs_dec = dropq_diff_table(df1, df2,
                                      groupby='weighted_deciles',
                                      res_col='combined_diff',
                                      diff_col='_combined',
                                      suffix='_dec', wsum=combined_dec_sum)

    comb_diffs_bin = dropq_diff_table(df1, df2,
                                      groupby='webapp_income_bins',
                                      res_col='combined_diff',
                                      diff_col='_combined',
                                      suffix='_bin', wsum=combined_bin_sum)

    mX_dec = create_distribution_table(df1, groupby='weighted_deciles',
                                       result_type='weighted_sum')

    mY_dec = dropq_dist_table(df2, groupby='weighted_deciles',
                              result_type='weighted_sum', suffix='_dec')

    mX_bin = create_distribution_table(df1, groupby='webapp_income_bins',
                                       result_type='weighted_sum')

    mY_bin = dropq_dist_table(df2, groupby='webapp_income_bins',
                              result_type='weighted_sum', suffix='_bin')

    return (mY_dec, mX_dec, diffs_dec, pr_diffs_dec, comb_diffs_dec,
            mY_bin, mX_bin, diffs_bin, pr_diffs_bin, comb_diffs_bin,
            dec_sum, pr_dec_sum, combined_dec_sum, sum_baseline,
            pr_sum_baseline, combined_sum_baseline, sum_reform,
            pr_sum_reform, combined_sum_reform)


def results(calc):
    """
    Return DataFrame containing results for STATS_COLUMNS Records variables.
    """
    outputs = []
    for col in STATS_COLUMNS:
        outputs.append(getattr(calc.records, col))
    return DataFrame(data=np.column_stack(outputs), columns=STATS_COLUMNS)


def run_nth_year_gdp_elast_model(year_n, start_year, taxrec_df, user_mods,
                                 return_json=True):
    """
    The run_nth_year_gdp_elast_model function assumes user_mods is a
    dictionary returned by the Calculator.read_json_parameter_files()
    function with an extra key:value pair that is specified as
    'gdp_elasticity': {'value': <float_value>}.
    """
    # pylint: disable=too-many-arguments,too-many-locals,too-many-statements

    check_user_mods(user_mods)

    # Only makes sense to run for budget years 1 through n-1 (not for year 0)
    assert year_n > 0

    # Specify value of gdp_elasticity
    gdp_elasticity = user_mods['gdp_elasticity']['value']

    # Specify Consumption instance
    consump = Consumption()
    consump_assumps = user_mods['consumption']
    consump.update_consumption(consump_assumps)

    # Specify growdiff_baseline and growdiff_response
    growdiff_baseline = Growdiff()
    growdiff_response = Growdiff()
    growdiff_base_assumps = user_mods['growdiff_baseline']
    growdiff_resp_assumps = user_mods['growdiff_response']
    growdiff_baseline.update_growdiff(growdiff_base_assumps)
    growdiff_response.update_growdiff(growdiff_resp_assumps)

    # Create pre-reform and post-reform Growfactors instances
    growfactors_pre = Growfactors()
    growdiff_baseline.apply_to(growfactors_pre)
    growfactors_post = Growfactors()
    growdiff_baseline.apply_to(growfactors_post)
    growdiff_response.apply_to(growfactors_post)

    # Create pre-reform Calculator instance
    records1 = Records(data=taxrec_df.copy(deep=True),
                       gfactors=growfactors_pre)
    policy1 = Policy(gfactors=growfactors_pre)
    calc1 = Calculator(policy=policy1, records=records1, consumption=consump)
    while calc1.current_year < start_year:
        calc1.increment_year()
    assert calc1.current_year == start_year

    # Create post-reform Calculator instance
    records2 = Records(data=taxrec_df.copy(deep=True),
                       gfactors=growfactors_post)
    policy2 = Policy(gfactors=growfactors_post)
    policy_reform = user_mods['policy']
    policy2.implement_reform(policy_reform)
    calc2 = Calculator(policy=policy2, records=records2, consumption=consump)
    while calc2.current_year < start_year:
        calc2.increment_year()
    assert calc2.current_year == start_year

    # Seed random number generator with a seed value based on user_mods
    seed = random_seed(user_mods)
    np.random.seed(seed)  # pylint: disable=no-member
    for _ in range(0, year_n - 1):
        calc1.increment_year()
        calc2.increment_year()
    calc1.calc_all()
    calc2.calc_all()

    # Assert that the current year is one behind the year we are calculating
    assert (calc1.current_year + 1) == (start_year + year_n)
    assert (calc2.current_year + 1) == (start_year + year_n)

    # Compute gdp effect
    gdp_effect = proportional_change_gdp(calc1, calc2, gdp_elasticity)

    # Return gdp_effect results
    if return_json:
        gdp_df = pd.DataFrame(data=[gdp_effect], columns=['col0'])
        gdp_elast_names_i = [x + '_' + str(year_n)
                             for x in GDP_ELAST_ROW_NAMES]
        gdp_elast_total = create_json_table(gdp_df,
                                            row_names=gdp_elast_names_i,
                                            num_decimals=5)
        gdp_elast_total = dict((k, v[0]) for k, v in gdp_elast_total.items())
        return gdp_elast_total
    else:
        return gdp_effect


def calculate_baseline_and_reform(year_n, start_year, taxrec_df, user_mods):
    """
    calculate_baseline_and_reform function assumes specified user_mods is
    a dictionary returned by the Calculator.read_json_parameter_files()
    function with an extra key:value pair that is specified as
    'gdp_elasticity': {'value': <float_value>}.
    """
    # pylint: disable=too-many-locals,too-many-branches,too-many-statements

    check_user_mods(user_mods)

    # Specify Consumption instance
    consump = Consumption()
    consump_assumptions = user_mods['consumption']
    consump.update_consumption(consump_assumptions)

    # Specify growdiff_baseline and growdiff_response
    growdiff_baseline = Growdiff()
    growdiff_response = Growdiff()
    growdiff_base_assumps = user_mods['growdiff_baseline']
    growdiff_resp_assumps = user_mods['growdiff_response']
    growdiff_baseline.update_growdiff(growdiff_base_assumps)
    growdiff_response.update_growdiff(growdiff_resp_assumps)

    # Create pre-reform and post-reform Growfactors instances
    growfactors_pre = Growfactors()
    growdiff_baseline.apply_to(growfactors_pre)
    growfactors_post = Growfactors()
    growdiff_baseline.apply_to(growfactors_post)
    growdiff_response.apply_to(growfactors_post)

    # Create pre-reform Calculator instance
    recs1 = Records(data=taxrec_df.copy(deep=True),
                    gfactors=growfactors_pre)
    policy1 = Policy(gfactors=growfactors_pre)
    calc1 = Calculator(policy=policy1, records=recs1, consumption=consump)
    while calc1.current_year < start_year:
        calc1.increment_year()
    calc1.calc_all()
    assert calc1.current_year == start_year

    # Create pre-reform Calculator instance with extra income
    recs1p = Records(data=taxrec_df.copy(deep=True),
                     gfactors=growfactors_pre)
    # add one dollar to total wages and salaries of each filing unit
    recs1p.e00200 += 1.0  # pylint: disable=no-member
    policy1p = Policy(gfactors=growfactors_pre)
    calc1p = Calculator(policy=policy1p, records=recs1p, consumption=consump)
    while calc1p.current_year < start_year:
        calc1p.increment_year()
    calc1p.calc_all()
    assert calc1p.current_year == start_year

    # Construct mask to show which of the calc1 and calc1p results differ
    soit1 = results(calc1)
    soit1p = results(calc1p)
    mask = (soit1._iitax != soit1p._iitax)  # pylint: disable=protected-access

    # Specify Behavior instance
    behv = Behavior()
    behavior_assumps = user_mods['behavior']
    behv.update_behavior(behavior_assumps)

    # Prevent both behavioral response and growdiff response
    if behv.has_any_response() and growdiff_response.has_any_response():
        msg = 'BOTH behavior AND growdiff_response HAVE RESPONSE'
        raise ValueError(msg)

    # Create post-reform Calculator instance with behavior
    recs2 = Records(data=taxrec_df.copy(deep=True),
                    gfactors=growfactors_post)
    policy2 = Policy(gfactors=growfactors_post)
    policy_reform = user_mods['policy']
    policy2.implement_reform(policy_reform)
    calc2 = Calculator(policy=policy2, records=recs2, consumption=consump,
                       behavior=behv)
    while calc2.current_year < start_year:
        calc2.increment_year()
    calc2.calc_all()
    assert calc2.current_year == start_year

    # Seed random number generator with a seed value based on user_mods
    seed = random_seed(user_mods)
    print('seed={}'.format(seed))
    np.random.seed(seed)  # pylint: disable=no-member

    # Increment Calculator objects for year_n years and calculate
    for _ in range(0, year_n):
        calc1.increment_year()
        calc2.increment_year()
    calc1.calc_all()
    if calc2.behavior.has_response():
        calc2 = Behavior.response(calc1, calc2)
    else:
        calc2.calc_all()

    # Return calculated results and mask
    soit1 = results(calc1)
    soit2 = results(calc2)
    return soit1, soit2, mask


def run_nth_year_model(year_n, start_year, taxrec_df, user_mods,
                       return_json=True):
    """
    run_nth_year_model function assumes specified specified user_mods is
    a dictionary returned by the Calculator.read_json_parameter_files()
    function with an extra key:value pair that is specified as
    'gdp_elasticity': {'value': <float_value>}.
    """
    # pylint: disable=too-many-arguments,too-many-locals,invalid-name

    check_user_mods(user_mods)

    start_time = time.time()
    (soit_baseline, soit_reform,
     mask) = calculate_baseline_and_reform(year_n, start_year,
                                           taxrec_df, user_mods)

    # Means of plan Y by decile
    # diffs of plan Y by decile
    # Means of plan Y by income bin
    # diffs of plan Y by income bin
    (mY_dec, mX_dec, df_dec, pdf_dec, cdf_dec, mY_bin, mX_bin, df_bin,
     pdf_bin, cdf_bin, diff_sum, payrolltax_diff_sum, combined_diff_sum,
     sum_baseline, pr_sum_baseline, combined_sum_baseline, sum_reform,
     pr_sum_reform,
     combined_sum_reform) = groupby_means_and_comparisons(soit_baseline,
                                                          soit_reform, mask)
    elapsed_time = time.time() - start_time
    print('elapsed time for this run: ', elapsed_time)

    tots = [diff_sum, payrolltax_diff_sum, combined_diff_sum]
    fiscal_tots_diff = pd.DataFrame(data=tots, index=TOTAL_ROW_NAMES)

    tots_baseline = [sum_baseline, pr_sum_baseline, combined_sum_baseline]
    fiscal_tots_baseline = pd.DataFrame(data=tots_baseline,
                                        index=TOTAL_ROW_NAMES)

    tots_reform = [sum_reform, pr_sum_reform, combined_sum_reform]
    fiscal_tots_reform = pd.DataFrame(data=tots_reform,
                                      index=TOTAL_ROW_NAMES)

    # Get rid of negative incomes
    df_bin.drop(df_bin.index[0], inplace=True)
    pdf_bin.drop(pdf_bin.index[0], inplace=True)
    cdf_bin.drop(cdf_bin.index[0], inplace=True)
    mY_bin.drop(mY_bin.index[0], inplace=True)
    mX_bin.drop(mX_bin.index[0], inplace=True)

    def append_year(x):
        """
        append_year embedded function
        """
        x.columns = [str(col) + '_{}'.format(year_n) for col in x.columns]
        return x

    if not return_json:
        return (append_year(mY_dec), append_year(mX_dec), append_year(df_dec),
                append_year(pdf_dec), append_year(cdf_dec),
                append_year(mY_bin), append_year(mX_bin), append_year(df_bin),
                append_year(pdf_bin), append_year(cdf_bin),
                append_year(fiscal_tots_diff),
                append_year(fiscal_tots_baseline),
                append_year(fiscal_tots_reform))

    decile_row_names_i = [x + '_' + str(year_n) for x in DECILE_ROW_NAMES]

    bin_row_names_i = [x + '_' + str(year_n) for x in BIN_ROW_NAMES]

    total_row_names_i = [x + '_' + str(year_n) for x in TOTAL_ROW_NAMES]

    mY_dec_table_i = create_json_table(mY_dec,
                                       row_names=decile_row_names_i,
                                       column_types=PLAN_COLUMN_TYPES)

    mX_dec_table_i = create_json_table(mX_dec,
                                       row_names=decile_row_names_i,
                                       column_types=PLAN_COLUMN_TYPES)

    df_dec_table_i = create_json_table(df_dec,
                                       row_names=decile_row_names_i,
                                       column_types=DIFF_COLUMN_TYPES)

    pdf_dec_table_i = create_json_table(pdf_dec,
                                        row_names=decile_row_names_i,
                                        column_types=DIFF_COLUMN_TYPES)

    cdf_dec_table_i = create_json_table(cdf_dec,
                                        row_names=decile_row_names_i,
                                        column_types=DIFF_COLUMN_TYPES)

    mY_bin_table_i = create_json_table(mY_bin,
                                       row_names=bin_row_names_i,
                                       column_types=PLAN_COLUMN_TYPES)

    mX_bin_table_i = create_json_table(mX_bin,
                                       row_names=bin_row_names_i,
                                       column_types=PLAN_COLUMN_TYPES)

    df_bin_table_i = create_json_table(df_bin,
                                       row_names=bin_row_names_i,
                                       column_types=DIFF_COLUMN_TYPES)

    pdf_bin_table_i = create_json_table(pdf_bin,
                                        row_names=bin_row_names_i,
                                        column_types=DIFF_COLUMN_TYPES)

    cdf_bin_table_i = create_json_table(cdf_bin,
                                        row_names=bin_row_names_i,
                                        column_types=DIFF_COLUMN_TYPES)

    fiscal_yr_total_df = create_json_table(fiscal_tots_diff,
                                           row_names=total_row_names_i)

    fiscal_yr_total_bl = create_json_table(fiscal_tots_baseline,
                                           row_names=total_row_names_i)

    fiscal_yr_total_rf = create_json_table(fiscal_tots_reform,
                                           row_names=total_row_names_i)

    # Make the one-item lists of strings just strings
    fiscal_yr_total_df = dict((k, v[0]) for k, v in fiscal_yr_total_df.items())
    fiscal_yr_total_bl = dict((k, v[0]) for k, v in fiscal_yr_total_bl.items())
    fiscal_yr_total_rf = dict((k, v[0]) for k, v in fiscal_yr_total_rf.items())

    return (mY_dec_table_i, mX_dec_table_i, df_dec_table_i, pdf_dec_table_i,
            cdf_dec_table_i, mY_bin_table_i, mX_bin_table_i, df_bin_table_i,
            pdf_bin_table_i, cdf_bin_table_i, fiscal_yr_total_df,
            fiscal_yr_total_bl, fiscal_yr_total_rf)


def run_model(taxrec_df, start_year, user_mods,
              return_json=True, num_years=NUM_YEARS_DEFAULT):
    """
    run_model function assumes specified user_mods is a
    dictionary returned by the Calculator.read_json_parameter_files()
    function with an extra key:value pair that is specified as
    'gdp_elasticity': {'value': <float_value>}.
    """
    # pylint: disable=too-many-arguments,too-many-locals,invalid-name

    check_user_mods(user_mods)

    num_fiscal_year_totals = list()
    mY_dec_table = dict()
    mX_dec_table = dict()
    df_dec_table = dict()
    pdf_dec_table = dict()
    cdf_dec_table = dict()
    mY_bin_table = dict()
    mX_bin_table = dict()
    df_bin_table = dict()
    pdf_bin_table = dict()
    cdf_bin_table = dict()
    for year_n in range(0, num_years):
        json_tables = run_nth_year_model(year_n, start_year=start_year,
                                         taxrec_df=taxrec_df,
                                         user_mods=user_mods,
                                         return_json=return_json)
        # map json_tables to named tables
        (mY_dec_table_i, mX_dec_table_i, df_dec_table_i, pdf_dec_table_i,
         cdf_dec_table_i, mY_bin_table_i, mX_bin_table_i, df_bin_table_i,
         _, _, num_fiscal_year_total,
         num_fiscal_year_total_bl, num_fiscal_year_total_rf) = json_tables
        # update list and dictionaries
        num_fiscal_year_totals.append(num_fiscal_year_total)
        num_fiscal_year_totals.append(num_fiscal_year_total_bl)
        num_fiscal_year_totals.append(num_fiscal_year_total_rf)
        mY_dec_table.update(mY_dec_table_i)
        mX_dec_table.update(mX_dec_table_i)
        df_dec_table.update(df_dec_table_i)
        pdf_dec_table.update(pdf_dec_table_i)
        cdf_dec_table.update(cdf_dec_table_i)
        mY_bin_table.update(mY_bin_table_i)
        mX_bin_table.update(mX_bin_table_i)
        df_bin_table.update(df_bin_table_i)
    return (mY_dec_table, mX_dec_table, df_dec_table, pdf_dec_table,
            cdf_dec_table, mY_bin_table, mX_bin_table, df_bin_table,
            pdf_bin_table, cdf_bin_table, num_fiscal_year_totals)


def run_gdp_elast_model(taxrec_df, start_year, user_mods,
                        return_json=True, num_years=NUM_YEARS_DEFAULT):
    """
    run_gdp_elast_model function assumes specified user_mods is a
    dictionary returned by the Calculator.read_json_parameter_files()
    function with an extra key:value pair that is specified as
    'gdp_elasticity': {'value': <float_value>}.
    """
    # pylint: disable=too-many-arguments
    check_user_mods(user_mods)
    gdp_elasticity_totals = []
    for year_n in range(1, num_years):
        gdp_elast_i = run_nth_year_gdp_elast_model(year_n,
                                                   start_year=start_year,
                                                   taxrec_df=taxrec_df,
                                                   user_mods=user_mods,
                                                   return_json=return_json)
        gdp_elasticity_totals.append(gdp_elast_i)
    return gdp_elasticity_totals


def format_macro_results(diff_data, return_json=True):
    """
    format_macro_results function.
    """
    ogusadf = pd.DataFrame(diff_data)
    if not return_json:
        return ogusadf
    column_types = [float] * diff_data.shape[1]
    df_ogusa_table = create_json_table(ogusadf,
                                       row_names=OGUSA_ROW_NAMES,
                                       column_types=column_types,
                                       num_decimals=3)
    return df_ogusa_table
