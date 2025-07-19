// Test the updated calculator with PDF values
const { calculateRevenue } = require('./lib/revenue-calculator.ts');

const pdfInputs = {
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

console.log("=== Testing Updated Calculator ===");
console.log("\nInput values from PDF:");
console.log("- Average Deal Size: $15,000");
console.log("- Daily Leads: 50");
console.log("- Unqualified %: 15%");
console.log("- Daily Booked Calls: 20");
console.log("- Total CRM Leads: 30,000");
console.log("- Show-up Rate: 75%");
console.log("- Conversion Rate: 30%");
console.log("- Follow-up: Medium");
console.log("- AOV: $7,500");

const results = calculateRevenue(pdfInputs);

console.log("\n=== RESULTS ===");
console.log(`Campaign A Revenue: $${results.campaign_a_revenue.toFixed(2)}`);
console.log(`Campaign B Revenue: $${results.campaign_b_revenue.toFixed(2)}`);
console.log(`Campaign C Revenue: $${results.campaign_c_revenue.toFixed(2)}`);
console.log(`\nTotal Lost Revenue: $${results.final_lost_revenue.toFixed(2)}`);
console.log(`Expected: $1,396,148.99`);
console.log(`Difference: $${Math.abs(results.final_lost_revenue - 1396148.99).toFixed(2)}`);

// Check if we're within $1 of the expected value
const isCorrect = Math.abs(results.final_lost_revenue - 1396148.99) < 1;
console.log(`\nTest ${isCorrect ? 'PASSED' : 'FAILED'}: Result is ${isCorrect ? 'within $1' : 'NOT close'} to expected value`);

// Also test AOV calculation
console.log(`\nAOV-based revenue: $${results.final_lost_revenue_average_order_value.toFixed(2)}`);
const expectedAOV = 1396148.99 * (7500/15000); // Should be half
console.log(`Expected AOV revenue: $${expectedAOV.toFixed(2)}`);
