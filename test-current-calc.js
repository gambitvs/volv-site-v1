// Direct test of the calculator
const { calculateRevenue } = require('./lib/revenue-calculator.ts');

const testInputs = {
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
};

console.log("Testing current calculator...");
try {
  const results = calculateRevenue(testInputs);
  console.log("\nResults:");
  console.log(`Campaign A: $${results.campaign_a_revenue.toFixed(2)}`);
  console.log(`Campaign B: $${results.campaign_b_revenue.toFixed(2)}`);
  console.log(`Campaign C: $${results.campaign_c_revenue.toFixed(2)}`);
  console.log(`\nContract Value: $${results.final_lost_revenue.toFixed(2)}`);
  console.log(`Cash Extraction (AOV): $${results.final_lost_revenue_average_order_value.toFixed(2)}`);
  
  console.log("\nExpected:");
  console.log("Contract Value: $1,396,148.91");
  console.log("Cash Extraction: $698,074.45");
  
  console.log("\nYour result of $1,792,125 suggests:");
  console.log("- Old multiplier-based calculation is being used");
  console.log("- Follow-up intensity is multiplying instead of being ignored");
  
} catch (error) {
  console.error("Error:", error);
}
