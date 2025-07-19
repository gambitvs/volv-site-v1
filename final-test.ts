import { calculateRevenue, FormData } from './lib/revenue-calculator'

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

console.log("=== Final Test with Spreadsheet Values ===")
console.log("\nExpected from spreadsheet:")
console.log("Campaign A: $169,435.55")
console.log("Campaign B: $1,084,387.50")
console.log("Campaign C: $142,325.86")
console.log("Total: $1,396,148.91")

const results = calculateRevenue(pdfInputs)

console.log("\nOur results:")
console.log(`Campaign A: $${results.campaign_a_revenue.toFixed(2)}`)
console.log(`Campaign B: $${results.campaign_b_revenue.toFixed(2)}`)
console.log(`Campaign C: $${results.campaign_c_revenue.toFixed(2)}`)
console.log(`Total: $${results.final_lost_revenue.toFixed(2)}`)

console.log("\nDifferences:")
console.log(`Campaign A: $${Math.abs(results.campaign_a_revenue - 169435.55).toFixed(2)}`)
console.log(`Campaign B: $${Math.abs(results.campaign_b_revenue - 1084387.50).toFixed(2)}`)
console.log(`Campaign C: $${Math.abs(results.campaign_c_revenue - 142325.86).toFixed(2)}`)
console.log(`Total: $${Math.abs(results.final_lost_revenue - 1396148.91).toFixed(2)}`)

const isExact = Math.abs(results.final_lost_revenue - 1396148.91) < 0.01
console.log(`\n${isExact ? '✓ EXACT MATCH!' : '✗ Not matching'}`)