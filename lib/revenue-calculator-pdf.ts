// PDF-compliant version of the revenue calculator
export interface FormData {
  average_deal_size: number
  daily_leads: number
  unqualified_fraction: number
  daily_booked_calls: number
  total_crm_leads: number
  show_up_rate: number
  conversion_rate: number
  follow_up_intensity: "none" | "minimal" | "medium" | "high"
  average_order_value?: number
  num_sales_reps?: number
}

// PDF Constants
const PDF_CONSTANTS = {
  post_sales_call_disqual_rate: 0.15,
  new_optin_booked_call_industry_avg: 0.3,  // 30%
  avg_pick_up_rate: 0.35,                   // 35%
  base_no_show_resistance: 0.25,
  base_new_opt_in_resistance: 0.2,
  base_pipeline_resistance: 0.1,
}

export function calculateRevenuePDF(data: FormData) {
  // Step 1: Calculate resistance based on follow-up intensity
  let no_show_resistance_pct = PDF_CONSTANTS.base_no_show_resistance
  let new_opt_in_resistance_pct = PDF_CONSTANTS.base_new_opt_in_resistance
  let pipeline_resistance_pct = PDF_CONSTANTS.base_pipeline_resistance
  
  if (data.follow_up_intensity === "medium") {
    no_show_resistance_pct += 0.05
    pipeline_resistance_pct += 0.05
  } else if (data.follow_up_intensity === "high") {
    no_show_resistance_pct += 0.10
    pipeline_resistance_pct += 0.10
  }
  
  // Step 2: Basic monthly calculations
  const approx_new_leads_per_month = data.daily_leads * 30
  const approx_booked_calls_per_month = approx_new_leads_per_month * PDF_CONSTANTS.new_optin_booked_call_industry_avg
  const reported_booked_calls_per_month = data.daily_booked_calls * 30
  
  // Step 3: Call flow calculations
  const calls_showed_per_month = approx_booked_calls_per_month * data.show_up_rate
  const deals_closed_per_month = calls_showed_per_month * data.conversion_rate
  const no_sales = calls_showed_per_month - deals_closed_per_month
  const dq_leads = no_sales * PDF_CONSTANTS.post_sales_call_disqual_rate
  const viable_follow_up_leads_month = no_sales - dq_leads
  
  // Step 4: New opt-ins and no-shows
  const potential_opt_ins = approx_new_leads_per_month - reported_booked_calls_per_month
  const dq_opt_ins = potential_opt_ins * data.unqualified_fraction
  const viable_new_opt_ins_month = potential_opt_ins - dq_opt_ins
  
  const calls_booked_didnt_show = approx_booked_calls_per_month - calls_showed_per_month
  const viable_no_shows = calls_booked_didnt_show * (1 - PDF_CONSTANTS.post_sales_call_disqual_rate)
  
  // Step 5: CRM lifetime calculations
  const crm_age_months = data.total_crm_leads / approx_new_leads_per_month
  const lifetime_no_shows = viable_no_shows * crm_age_months
  const lifetime_new_opt_ins = viable_new_opt_ins_month * crm_age_months
  const lifetime_pipeline_leads = viable_follow_up_leads_month * crm_age_months
  
  // Step 6: Campaign leads (using resistance)
  const campaignA_leads = lifetime_no_shows * no_show_resistance_pct
  const campaignB_leads = lifetime_new_opt_ins * new_opt_in_resistance_pct
  const campaignC_leads = lifetime_pipeline_leads * pipeline_resistance_pct
  
  // Step 7: Closed deals calculation
  // PDF formula: leads * pickup * booking * show_up * conversion
  const campaignA_closed_deals = campaignA_leads * PDF_CONSTANTS.avg_pick_up_rate * 
                                 PDF_CONSTANTS.new_optin_booked_call_industry_avg * 
                                 data.show_up_rate * data.conversion_rate
  
  const campaignB_closed_deals = campaignB_leads * PDF_CONSTANTS.avg_pick_up_rate * 
                                 PDF_CONSTANTS.new_optin_booked_call_industry_avg * 
                                 data.show_up_rate * data.conversion_rate
  
  const campaignC_closed_deals = campaignC_leads * PDF_CONSTANTS.avg_pick_up_rate * 
                                 PDF_CONSTANTS.new_optin_booked_call_industry_avg * 
                                 data.show_up_rate * data.conversion_rate
  
  // Step 8: Revenue calculations
  const campaignA_revenue = campaignA_closed_deals * data.average_deal_size
  const campaignB_revenue = campaignB_closed_deals * data.average_deal_size
  const campaignC_revenue = campaignC_closed_deals * data.average_deal_size
  
  const final_lost_revenue = campaignA_revenue + campaignB_revenue + campaignC_revenue
  
  // AOV calculations if provided
  let aov_revenue = final_lost_revenue
  if (data.average_order_value) {
    const campaignA_revenue_aov = campaignA_closed_deals * data.average_order_value
    const campaignB_revenue_aov = campaignB_closed_deals * data.average_order_value
    const campaignC_revenue_aov = campaignC_closed_deals * data.average_order_value
    aov_revenue = campaignA_revenue_aov + campaignB_revenue_aov + campaignC_revenue_aov
  }
  
  console.log("\n=== PDF Calculation Debug ===")
  console.log(`Resistance %: no_show=${no_show_resistance_pct}, new_opt=${new_opt_in_resistance_pct}, pipeline=${pipeline_resistance_pct}`)
  console.log(`Monthly: leads=${approx_new_leads_per_month}, booked=${approx_booked_calls_per_month}`)
  console.log(`CRM age: ${crm_age_months.toFixed(2)} months`)
  console.log(`Lifetime: no_shows=${lifetime_no_shows.toFixed(2)}, new_opt=${lifetime_new_opt_ins.toFixed(2)}, pipeline=${lifetime_pipeline_leads.toFixed(2)}`)
  console.log(`Campaign leads: A=${campaignA_leads.toFixed(2)}, B=${campaignB_leads.toFixed(2)}, C=${campaignC_leads.toFixed(2)}`)
  console.log(`Closed deals: A=${campaignA_closed_deals.toFixed(2)}, B=${campaignB_closed_deals.toFixed(2)}, C=${campaignC_closed_deals.toFixed(2)}`)
  console.log(`Revenue: A=$${campaignA_revenue.toFixed(2)}, B=$${campaignB_revenue.toFixed(2)}, C=$${campaignC_revenue.toFixed(2)}`)
  console.log(`Total: $${final_lost_revenue.toFixed(2)}`)
  
  return {
    campaign_a_revenue: campaignA_revenue,
    campaign_b_revenue: campaignB_revenue,
    campaign_c_revenue: campaignC_revenue,
    final_lost_revenue: final_lost_revenue,
    final_lost_revenue_average_order_value: aov_revenue,
  }
}

// Test with PDF values
const pdfInputs: FormData = {
  average_deal_size: 15000,
  daily_leads: 50,
  unqualified_fraction: 0.15,
  daily_booked_calls: 20,
  total_crm_leads: 30000,
  show_up_rate: 0.75,
  conversion_rate: 0.3,
  follow_up_intensity: "medium",
  average_order_value: 7500,
  num_sales_reps: 7
}

console.log("Testing PDF implementation...")
console.log("Expected: $1,501,198.95 (but PDF shows $1,396,148.991)")
const result = calculateRevenuePDF(pdfInputs)
console.log(`\nActual result: $${result.final_lost_revenue.toFixed(2)}`)