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

export interface RevenueResults {
  final_lost_revenue: number
  final_lost_revenue_average_order_value: number
  lower_range: number
  upper_range: number
  campaign_a_revenue: number
  campaign_b_revenue: number
  campaign_c_revenue: number
  performance_categories: {
    show_up_rate: PerformanceCategory
    conversion_rate: PerformanceCategory
    disqualification_rate: PerformanceCategory
    activity_rate: PerformanceCategory
  }
  monthly_leads: number
  monthly_booked_calls: number
  qualified_monthly_leads: number
  no_shows_monthly: number
}

export interface PerformanceCategory {
  category: string
  color: string
  definition: string
  percentage: number
}

// Benchmarks and Constants - Updated based on PDF calculations
const BENCHMARKS = {
  // Booking rates
  new_optin_booked_call_industry_avg: 0.15, // 15% industry average booking rate
  follow_up_pick_up_avg: 0.25, // 25% pick-up rate for dormant leads
  
  // Base revival rates (conservative)
  base_no_show_revive: 0.15, // 15% base recovery for no-shows
  base_new_optin_revive: 0.20, // 20% base recovery for unbooked leads
  base_pipeline_revive: 0.08, // 8% base recovery for dormant pipeline
  
  // Follow-up effectiveness multipliers (not resistance)
  follow_up_multipliers: {
    none: 1.0,      // No improvement
    minimal: 1.2,   // 20% improvement
    medium: 1.5,    // 50% improvement  
    high: 2.0,      // 100% improvement (doubles recovery rates)
  },
  
  // Show-up rate for revived leads (typically lower than fresh leads)
  revived_show_up_multiplier: 0.8, // 80% of normal show-up rate
}

const PERFORMANCE_CATEGORIES = {
  show_up_rate: [
    { min: 0, max: 50, category: "Critical", color: "red", definition: "Dangerously low; most prospects are not attending." },
    { min: 50, max: 60, category: "Below Average", color: "orange", definition: "Below average; unreliable attendance." },
    { min: 60, max: 75, category: "Steady", color: "yellow", definition: "Meets expectations; room for optimization." },
    { min: 75, max: 85, category: "Reliable", color: "green", definition: "Strong; solid engagement practices." },
    { min: 85, max: 100, category: "Outstanding", color: "blue", definition: "Exceptional; exceeds industry benchmarks." },
  ],
  conversion_rate: [
    { min: 0, max: 20, category: "Underperforming", color: "red", definition: "Conversion rate is far below benchmarks; major improvements needed." },
    { min: 20, max: 35, category: "Developing", color: "orange", definition: "Below average; improvements are needed to close more deals." },
    { min: 35, max: 50, category: "Steady", color: "yellow", definition: "Average performance; some optimization possible." },
    { min: 50, max: 100, category: "High Performing", color: "green", definition: "Above average; good conversion practices." },
  ],
  disqualification_rate: [
    { min: 0, max: 10, category: "Low", color: "green", definition: "Efficient lead qualification." },
    { min: 10, max: 30, category: "Average", color: "yellow", definition: "Standard disqualification; monitor lead quality." },
    { min: 30, max: 100, category: "High", color: "red", definition: "Many unqualified leads; improve lead generation." },
  ],
  activity_rate: [
    { min: 0, max: 5, category: "Low", color: "red", definition: "Low activity; increase outreach efforts." },
    { min: 5, max: 15, category: "Average", color: "yellow", definition: "Standard activity; room for more calls." },
    { min: 15, max: 100, category: "High", color: "green", definition: "Strong activity; good engagement." },
  ],
}

function getPerformanceCategory(value: number, type: keyof typeof PERFORMANCE_CATEGORIES): PerformanceCategory {
  const categories = PERFORMANCE_CATEGORIES[type]
  const category = categories.find(cat => value >= cat.min && value < cat.max) || categories[categories.length - 1]
  
  return {
    category: category.category,
    color: category.color,
    definition: category.definition,
    percentage: value,
  }
}

export function calculateRevenue(data: FormData): RevenueResults {
  // Input validation and bounds checking
  const daily_leads = Math.max(0, data.daily_leads)
  const daily_booked_calls = Math.min(data.daily_booked_calls, daily_leads * (1 - data.unqualified_fraction))
  const show_up_rate = Math.min(1, Math.max(0, data.show_up_rate))
  const conversion_rate = Math.min(1, Math.max(0, data.conversion_rate))
  const unqualified_fraction = Math.min(1, Math.max(0, data.unqualified_fraction))
  
  // Base metrics
  const monthly_leads = daily_leads * 30
  const monthly_booked_calls = daily_booked_calls * 30
  const qualified_monthly_leads = monthly_leads * (1 - unqualified_fraction)
  const no_shows_monthly = monthly_booked_calls * (1 - show_up_rate)

  // Revenue metric - prefer AOV if provided, otherwise use deal size
  const rev_metric = data.average_order_value || data.average_deal_size

  // Get follow-up effectiveness multiplier (NOT resistance)
  const follow_up_multiplier = BENCHMARKS.follow_up_multipliers[data.follow_up_intensity]

  // Calculate effective revival rates with follow-up boost
  const effective_no_show_revive = BENCHMARKS.base_no_show_revive * follow_up_multiplier
  const effective_new_optin_revive = BENCHMARKS.base_new_optin_revive * follow_up_multiplier
  const effective_pipeline_revive = BENCHMARKS.base_pipeline_revive * follow_up_multiplier

  // Campaign A: No-Shows Revival
  // Revived no-shows need to show up again (at a reduced rate) before converting
  const recoverable_no_shows = no_shows_monthly * effective_no_show_revive
  const revived_show_up_rate = show_up_rate * BENCHMARKS.revived_show_up_multiplier
  const showed_up_revived_a = recoverable_no_shows * revived_show_up_rate
  const closed_deals_a = showed_up_revived_a * conversion_rate
  const campaign_a_revenue = closed_deals_a * rev_metric

  // Campaign B: New Opt-Ins Not Booking
  // Calculate actual booking rate and capacity
  const qualified_daily_leads = daily_leads * (1 - unqualified_fraction)
  const current_booking_rate = qualified_daily_leads > 0 ? daily_booked_calls / qualified_daily_leads : 0
  const industry_booking_rate = BENCHMARKS.new_optin_booked_call_industry_avg
  
  // Only count lost bookings if we're below industry average
  const booking_gap = Math.max(0, industry_booking_rate - current_booking_rate)
  const lost_bookings = qualified_monthly_leads * booking_gap
  const recoverable_b = lost_bookings * effective_new_optin_revive
  const closed_deals_b = recoverable_b * show_up_rate * conversion_rate
  const campaign_b_revenue = closed_deals_b * rev_metric

  // Campaign C: Dormant Pipeline Revival
  // Apply lead decay factor (older leads are harder to revive)
  const lead_quality_factor = 0.7 // Assume 70% of CRM leads are still viable
  const viable_dormant_leads = data.total_crm_leads * lead_quality_factor
  const recoverable_c = viable_dormant_leads * effective_pipeline_revive
  const picked_up_c = recoverable_c * BENCHMARKS.follow_up_pick_up_avg
  const showed_up_c = picked_up_c * revived_show_up_rate
  const closed_deals_c = showed_up_c * conversion_rate
  const campaign_c_revenue = closed_deals_c * rev_metric

  // Final calculations
  const final_lost_revenue = campaign_a_revenue + campaign_b_revenue + campaign_c_revenue
  const final_lost_revenue_average_order_value = final_lost_revenue // Same value unless AOV is different

  // Deal ranges
  const avg_deals = final_lost_revenue / data.average_deal_size
  const lower_range = Math.floor(avg_deals * 0.85)
  const upper_range = Math.ceil(avg_deals * 1.15)

  // Performance categories
  const show_up_rate_percent = show_up_rate * 100
  const conversion_rate_percent = conversion_rate * 100
  const disqualification_rate_percent = unqualified_fraction * 100
  const activity_rate_percent = daily_leads > 0 ? (daily_booked_calls / daily_leads) * 100 : 0

  return {
    final_lost_revenue,
    final_lost_revenue_average_order_value,
    lower_range,
    upper_range,
    campaign_a_revenue,
    campaign_b_revenue,
    campaign_c_revenue,
    performance_categories: {
      show_up_rate: getPerformanceCategory(show_up_rate_percent, 'show_up_rate'),
      conversion_rate: getPerformanceCategory(conversion_rate_percent, 'conversion_rate'),
      disqualification_rate: getPerformanceCategory(disqualification_rate_percent, 'disqualification_rate'),
      activity_rate: getPerformanceCategory(activity_rate_percent, 'activity_rate'),
    },
    monthly_leads,
    monthly_booked_calls,
    qualified_monthly_leads,
    no_shows_monthly,
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(num))
}
