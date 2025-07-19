// Complete trace of spreadsheet calculations

// Inputs
const daily_leads = 50
const daily_booked_calls = 20
const unqualified_fraction = 0.15
const total_crm_leads = 30000
const show_up_rate = 0.75
const conversion_rate = 0.3

// Constants
const new_optin_booked_call_industry_avg = 0.3
const post_sales_call_disqual_rate = 0.15

// Step 1: Monthly calculations
const approx_new_leads_per_month = daily_leads * 30 // 1500
const approx_booked_calls_per_month = approx_new_leads_per_month * new_optin_booked_call_industry_avg // 450
const reported_booked_calls_per_month = daily_booked_calls * 30 // 600

console.log("Monthly calculations:")
console.log(`approx_new_leads_per_month: ${approx_new_leads_per_month}`)
console.log(`approx_booked_calls_per_month: ${approx_booked_calls_per_month}`)
console.log(`reported_booked_calls_per_month: ${reported_booked_calls_per_month}`)

// Step 2: Call flow
const calls_showed_per_month = approx_booked_calls_per_month * show_up_rate // 337.5
const deals_closed_per_month = calls_showed_per_month * conversion_rate // 101.25
const no_sales = calls_showed_per_month - deals_closed_per_month // 236.25
const dq_leads = no_sales * post_sales_call_disqual_rate // 35.4375
const viable_follow_up_leads_month = no_sales - dq_leads // 200.8125

console.log("\nCall flow:")
console.log(`calls_showed_per_month: ${calls_showed_per_month}`)
console.log(`deals_closed_per_month: ${deals_closed_per_month}`)
console.log(`no_sales: ${no_sales}`)
console.log(`dq_leads: ${dq_leads}`)
console.log(`viable_follow_up_leads_month: ${viable_follow_up_leads_month}`)

// Step 3: Opt-ins and no-shows
const potential_opt_ins = approx_new_leads_per_month - reported_booked_calls_per_month // 900
const dq_opt_ins = potential_opt_ins * unqualified_fraction // 135
const viable_new_opt_ins_month = potential_opt_ins - dq_opt_ins // 765

const calls_booked_didnt_show = approx_booked_calls_per_month - calls_showed_per_month // 112.5
const viable_no_shows = calls_booked_didnt_show * (1 - post_sales_call_disqual_rate) // 95.625

console.log("\nOpt-ins and no-shows:")
console.log(`potential_opt_ins: ${potential_opt_ins}`)
console.log(`viable_new_opt_ins_month: ${viable_new_opt_ins_month}`)
console.log(`calls_booked_didnt_show: ${calls_booked_didnt_show}`)
console.log(`viable_no_shows: ${viable_no_shows}`)

// Step 4: CRM age and lifetime
const crm_age_months = total_crm_leads / approx_new_leads_per_month // 20
const lifetime_no_shows = viable_no_shows * crm_age_months // 1912.5
const lifetime_new_opt_ins = viable_new_opt_ins_month * crm_age_months // 15300
const lifetime_pipeline_leads = viable_follow_up_leads_month * crm_age_months // 4016.25

console.log("\nLifetime calculations:")
console.log(`crm_age_months: ${crm_age_months}`)
console.log(`lifetime_no_shows: ${lifetime_no_shows}`)
console.log(`lifetime_new_opt_ins: ${lifetime_new_opt_ins}`)
console.log(`lifetime_pipeline_leads: ${lifetime_pipeline_leads}`)

// Step 5: Campaign leads (with resistance)
const campaignA_leads = lifetime_no_shows * 0.25 // 478.125
const campaignB_leads = lifetime_new_opt_ins * 0.2 // 3060
const campaignC_leads = lifetime_pipeline_leads * 0.1 // 401.625

console.log("\nCampaign leads:")
console.log(`campaignA_leads: ${campaignA_leads}`)
console.log(`campaignB_leads: ${campaignB_leads}`)
console.log(`campaignC_leads: ${campaignC_leads}`)

// Verify these match spreadsheet
console.log("\nSpreadsheet values:")
console.log(`Campaign A: 478.125 ${campaignA_leads === 478.125 ? '✓' : '✗'}`)
console.log(`Campaign B: 3060 ${campaignB_leads === 3060 ? '✓' : '✗'}`)
console.log(`Campaign C: 401.625 ${campaignC_leads === 401.625 ? '✓' : '✗'}`)