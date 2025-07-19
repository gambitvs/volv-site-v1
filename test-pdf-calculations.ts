import { calculateRevenue, FormData } from './lib/revenue-calculator.js'

// Exact values from PDF
const pdfInputs: FormData = {
  average_deal_size: 15000,        // $15,000.00
  daily_leads: 50,                 // 50
  unqualified_fraction: 0.15,      // 0.15 (15%)
  daily_booked_calls: 20,          // 20
  total_crm_leads: 30000,          // 30000
  show_up_rate: 0.75,              // 0.75 (75%)
  conversion_rate: 0.3,            // 0.3 (30%)
  follow_up_intensity: "medium",   // medium
  average_order_value: 7500,       // $7,500.00
  num_sales_reps: 7                // 7
}

// PDF Constants (DIFFERENT from our implementation!)
const PDF_CONSTANTS = {
  post_sales_call_disqual_rate: 0.15,
  new_optin_booked_call_industry_avg: 0.3,  // We use 0.15
  avg_pick_up_rate: 0.35,                   // We use 0.25
  base_no_show_resistance: 0.25,
  base_new_opt_in_resistance: 0.2,
  base_pipeline_resistance: 0.1,
}

// PDF Resistance calculations (OPPOSITE of our approach!)
const PDF_RESISTANCE = {
  no_show_resistance_pct: 0.3,      // 0.25 + 0.05 for medium
  new_opt_in_resistance_pct: 0.2,   // unchanged
  pipeline_resistance_pct: 0.15,     // 0.1 + 0.05 for medium
}

console.log("=== PDF vs Implementation Comparison ===\n")

// Calculate using our implementation
const ourResults = calculateRevenue(pdfInputs)

console.log("PDF Expected Values:")
console.log("- Campaign A Revenue (avg price): $203,322.66")
console.log("- Campaign B Revenue (avg price): $1,084,387.50")
console.log("- Campaign C Revenue (avg price): $213,488.79")
console.log("- Total (avg price): $1,501,198.95")
console.log("- Total (AOV): $750,599.47")

console.log("\nOur Current Results:")
console.log(`- Campaign A Revenue: $${ourResults.campaign_a_revenue.toFixed(2)}`)
console.log(`- Campaign B Revenue: $${ourResults.campaign_b_revenue.toFixed(2)}`)
console.log(`- Campaign C Revenue: $${ourResults.campaign_c_revenue.toFixed(2)}`)
console.log(`- Total: $${ourResults.final_lost_revenue.toFixed(2)}`)

// Manual PDF calculations for comparison
console.log("\n=== PDF Calculation Breakdown ===")

// PDF Base calculations
const approx_new_leads_per_month = 1500  // 50 * 30
const approx_booked_calls_per_month = 450  // 1500 * 0.3
const reported_booked_calls_per_month = 600  // 20 * 30
const calls_showed_per_month = 337.5  // 450 * 0.75
const deals_closed_per_month = 101.25  // 337.5 * 0.3
const no_sales = 236.25  // 337.5 - 101.25
const dq_leads = 35.4375  // 236.25 * 0.15
const viable_follow_up_leads_month = 200.8125  // 236.25 - 35.4375

// PDF Campaign calculations
const crm_age_months = 20  // 30000 / 1500
const lifetime_no_shows = 1912.5  // 95.625 * 20
const lifetime_new_opt_ins = 15300  // 765 * 20
const lifetime_pipeline_leads = 4016.25  // 200.8125 * 20

// PDF uses RESISTANCE (subtracts from base)
const campaignA_leads = 573.75  // 1912.5 * 0.3
const campaignB_leads = 3060    // 15300 * 0.2
const campaignC_leads = 602.4375  // 4016.25 * 0.15

// PDF closed deals calculation
const campaignA_closed_deals = 13.55484375  // 573.75 * 0.35 * 0.3 * 0.75 * 0.3
const campaignB_closed_deals = 72.2925      // 3060 * 0.35 * 0.3 * 0.75 * 0.3
const campaignC_closed_deals = 14.23258594  // 602.4375 * 0.35 * 0.3 * 0.75 * 0.3

console.log("\nKey Differences Found:")
console.log("1. PDF uses RESISTANCE (subtracts), we use MULTIPLIERS (multiply)")
console.log("2. PDF industry booking avg: 0.3, ours: 0.15")
console.log("3. PDF pick-up rate: 0.35, ours: 0.25")
console.log("4. PDF calculation chain is completely different")
console.log("5. PDF applies show-up and conversion to ALL campaigns")

console.log("\nPDF Campaign A formula:")
console.log("  lifetime_no_shows * resistance * pickup * booking * show_up * conversion")
console.log(`  1912.5 * 0.3 * 0.35 * 0.3 * 0.75 * 0.3 = ${campaignA_closed_deals}`)
console.log(`  ${campaignA_closed_deals} * $15,000 = $${(campaignA_closed_deals * 15000).toFixed(2)}`)
