// Quick test to see actual output
console.log("Testing calculator output...");

// Test inputs from PDF
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

// Log the key constants to verify
console.log("\nChecking constants:");
console.log("- Industry booking avg should be 0.3");
console.log("- Pick-up rate should be 0.35");
console.log("- Base resistances: no_show=0.25, new_opt=0.2, pipeline=0.1");

// Expected results from spreadsheet
console.log("\nExpected results:");
console.log("Campaign A: $169,435.55");
console.log("Campaign B: $1,084,387.50");
console.log("Campaign C: $142,325.86");
console.log("Total: $1,396,148.91");

console.log("\nYour current result: $1,792,125");
console.log("This suggests the old calculation is still being used.");
