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

// Benchmarks and Constants
const BENCHMARKS = {
  new_optin_booked_call_industry_avg: 0.1, // 10%
  follow_up_pick_up_avg: 0.3, // 30%
  base_no_show_revive: 0.2, // 20%
  base_new_optin_revive: 0.15, // 15%
  base_pipeline_revive: 0.1, // 10%
  base_no_show_resistance: 0.0,
  base_new_optin_resistance: 0.0,
  base_pipeline_resistance: 0.0,
}

const RESISTANCE_ADJUSTMENTS = {
  none: 0,
  minimal: 0,
  medium: 0.05,
  high: 0.1,
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
  // Base metrics
  const monthly_leads = data.daily_leads * 30
  const monthly_booked_calls = data.daily_booked_calls * 30
  const qualified_monthly_leads = monthly_leads * (1 - data.unqualified_fraction)
  const no_shows_monthly = monthly_booked_calls * (1 - data.show_up_rate)

  // Revenue metric - prefer AOV if provided, otherwise use deal size
  const rev_metric = data.average_order_value || data.average_deal_size

  // Resistance adjustments
  const resistance_adjustment = RESISTANCE_ADJUSTMENTS[data.follow_up_intensity]

  // Effective revive fractions
  const effective_no_show_revive = Math.max(0, BENCHMARKS.base_no_show_revive - (BENCHMARKS.base_no_show_resistance + resistance_adjustment))
  const effective_new_optin_revive = Math.max(0, BENCHMARKS.base_new_optin_revive - BENCHMARKS.base_new_optin_resistance)
  const effective_pipeline_revive = Math.max(0, BENCHMARKS.base_pipeline_revive - (BENCHMARKS.base_pipeline_resistance + resistance_adjustment))

  // Campaign A: No-Shows Revival
  const recoverable_a = no_shows_monthly * effective_no_show_revive
  const closed_deals_a = recoverable_a * data.conversion_rate
  const campaign_a_revenue = closed_deals_a * rev_metric

  // Campaign B: New Opt-Ins Not Booking
  const potential_bookings = qualified_monthly_leads * BENCHMARKS.new_optin_booked_call_industry_avg
  const lost_bookings = Math.max(0, potential_bookings - monthly_booked_calls)
  const recoverable_b = lost_bookings * effective_new_optin_revive
  const closed_deals_b = recoverable_b * data.show_up_rate * data.conversion_rate
  const campaign_b_revenue = closed_deals_b * rev_metric

  // Campaign C: Dormant Pipeline Revival
  const recoverable_c = data.total_crm_leads * effective_pipeline_revive
  const closed_deals_c = recoverable_c * BENCHMARKS.follow_up_pick_up_avg * data.conversion_rate
  const campaign_c_revenue = closed_deals_c * rev_metric

  // Final calculations
  const final_lost_revenue = campaign_a_revenue + campaign_b_revenue + campaign_c_revenue
  const final_lost_revenue_average_order_value = final_lost_revenue // Same value unless AOV is different

  // Deal ranges
  const avg_deals = final_lost_revenue / data.average_deal_size
  const lower_range = Math.floor(avg_deals * 0.85)
  const upper_range = Math.ceil(avg_deals * 1.15)

  // Performance categories
  const show_up_rate_percent = data.show_up_rate * 100
  const conversion_rate_percent = data.conversion_rate * 100
  const disqualification_rate_percent = data.unqualified_fraction * 100
  const activity_rate_percent = (data.daily_booked_calls / data.daily_leads) * 100

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
