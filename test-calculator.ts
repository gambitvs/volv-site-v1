import { calculateRevenue, FormData } from './lib/revenue-calculator'

// Test case from PDF - should output $1,396,148.991
const testData: FormData = {
  average_deal_size: 10000, // Need to confirm this from PDF
  daily_leads: 100, // Need to confirm this from PDF
  unqualified_fraction: 0.2, // Need to confirm this from PDF
  daily_booked_calls: 10, // Need to confirm this from PDF
  total_crm_leads: 5000, // Need to confirm this from PDF
  show_up_rate: 0.7, // Need to confirm this from PDF
  conversion_rate: 0.25, // Need to confirm this from PDF
  follow_up_intensity: "medium", // Need to confirm this from PDF
  average_order_value: undefined,
  num_sales_reps: undefined
}

console.log("Testing calculator with PDF example data...")
console.log("Expected output: $1,396,148.991")
console.log("Your current output: $1,792,125")
console.log("\nInput data:")
console.log(testData)

const results = calculateRevenue(testData)

console.log("\n=== CALCULATION BREAKDOWN ===")
console.log("\nBase Metrics:")
console.log(`Monthly leads: ${results.monthly_leads}`)
console.log(`Monthly booked calls: ${results.monthly_booked_calls}`)
console.log(`Qualified monthly leads: ${results.qualified_monthly_leads}`)
console.log(`No-shows monthly: ${results.no_shows_monthly}`)

console.log("\nCampaign A (No-Shows Revival):")
console.log(`Revenue: $${results.campaign_a_revenue.toFixed(2)}`)

console.log("\nCampaign B (New Opt-Ins):")
console.log(`Revenue: $${results.campaign_b_revenue.toFixed(2)}`)

console.log("\nCampaign C (Dormant Pipeline):")
console.log(`Revenue: $${results.campaign_c_revenue.toFixed(2)}`)

console.log("\n=== FINAL RESULT ===")
console.log(`Total Lost Revenue: $${results.final_lost_revenue.toFixed(2)}`)
console.log(`Expected: $1,396,148.991`)
console.log(`Difference: $${Math.abs(results.final_lost_revenue - 1396148.991).toFixed(2)}`)