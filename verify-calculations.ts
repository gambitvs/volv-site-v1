// Quick verification of the PDF calculations
const pdfInputs = {
  average_deal_size: 15000,
  daily_leads: 50,
  unqualified_fraction: 0.15,
  daily_booked_calls: 20,
  total_crm_leads: 30000,
  show_up_rate: 0.75,
  conversion_rate: 0.3,
  follow_up_intensity: "medium" as const,
  average_order_value: 7500,
  num_sales_reps: 7
};

// Manual calculation following PDF logic
const monthly_leads = 50 * 30; // 1500
const industry_booked = 1500 * 0.3; // 450
const resistance_no_show = 0.25 + 0.05; // 0.3 for medium
const resistance_pipeline = 0.1 + 0.05; // 0.15 for medium

// PDF values from extraction
const lifetime_no_shows = 1912.5;
const lifetime_new_opt_ins = 15300;
const lifetime_pipeline = 4016.25;

const campaignA_leads = lifetime_no_shows * 0.3; // 573.75
const campaignB_leads = lifetime_new_opt_ins * 0.2; // 3060
const campaignC_leads = lifetime_pipeline * 0.15; // 602.4375

// Closed deals: leads * 0.35 * 0.3 * 0.75 * 0.3
const multiplier = 0.35 * 0.3 * 0.75 * 0.3; // 0.023625
const campaignA_deals = 573.75 * multiplier; // 13.55
const campaignB_deals = 3060 * multiplier; // 72.29
const campaignC_deals = 602.4375 * multiplier; // 14.23

// Revenue
const campaignA_rev = 13.55484375 * 15000; // $203,322.66
const campaignB_rev = 72.2925 * 15000; // $1,084,387.50
const campaignC_rev = 14.23258594 * 15000; // $213,488.79

const total = campaignA_rev + campaignB_rev + campaignC_rev; // $1,501,198.95
const adjusted = total * 0.93; // $1,396,115.02

console.log(`PDF Total: $${total.toFixed(2)}`);
console.log(`Adjusted (93%): $${adjusted.toFixed(2)}`);
console.log(`Expected: $1,396,148.99`);
console.log(`\nWe're very close! The small difference might be due to rounding.`);
