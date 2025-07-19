// Direct test of calculator values
const calculator = require('./lib/revenue-calculator.ts');

const testData = {
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

console.log("\n=== CALCULATOR VERIFICATION ===");

const results = calculator.calculateRevenue(testData);

console.log("\nCampaign Results:");
console.log(`Campaign A: ${calculator.formatCurrency(results.campaign_a_revenue)}`);
console.log(`Campaign B: ${calculator.formatCurrency(results.campaign_b_revenue)}`);
console.log(`Campaign C: ${calculator.formatCurrency(results.campaign_c_revenue)}`);

console.log("\nTotal Values:");
console.log(`Contract Value: ${calculator.formatCurrency(results.final_lost_revenue)}`);
console.log(`Cash Extraction: ${calculator.formatCurrency(results.final_lost_revenue_average_order_value)}`);

console.log("\nExpected Values:");
console.log("Contract Value: $1,396,149");
console.log("Cash Extraction: $698,074");

console.log("\nDifference:");
const contractDiff = Math.abs(results.final_lost_revenue - 1396149);
const cashDiff = Math.abs(results.final_lost_revenue_average_order_value - 698074);
console.log(`Contract Value diff: ${calculator.formatCurrency(contractDiff)}`);
console.log(`Cash Extraction diff: ${calculator.formatCurrency(cashDiff)}`);