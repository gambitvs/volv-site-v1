// Debug the spreadsheet calculations

// From spreadsheet
const campaignA_leads = 478.125
const campaignB_leads = 3060
const campaignC_leads = 401.625

const campaignA_closed = 11.29570313
const campaignB_closed = 72.2925
const campaignC_closed = 9.488390625

// Calculate the multiplier used
const multiplierA = campaignA_closed / campaignA_leads
const multiplierB = campaignB_closed / campaignB_leads
const multiplierC = campaignC_closed / campaignC_leads

console.log("Multipliers used:")
console.log(`Campaign A: ${campaignA_closed} / ${campaignA_leads} = ${multiplierA}`)
console.log(`Campaign B: ${campaignB_closed} / ${campaignB_leads} = ${multiplierB}`)
console.log(`Campaign C: ${campaignC_closed} / ${campaignC_leads} = ${multiplierC}`)

// Our current formula: 0.35 * 0.3 * 0.75 * 0.3 = 0.023625
const ourMultiplier = 0.35 * 0.3 * 0.75 * 0.3
console.log(`\nOur multiplier: ${ourMultiplier}`)

// Check if they're the same
console.log("\nAre they the same?")
console.log(`Campaign A uses: ${multiplierA.toFixed(6)} (expected: ${ourMultiplier})`)
console.log(`Campaign B uses: ${multiplierB.toFixed(6)} (expected: ${ourMultiplier})`) 
console.log(`Campaign C uses: ${multiplierC.toFixed(6)} (expected: ${ourMultiplier})`)

// Revenue check
const revenueA = 169435.55
const revenueB = 1084387.50
const revenueC = 142325.86

console.log("\nRevenue per deal:")
console.log(`Campaign A: $${revenueA} / ${campaignA_closed} = $${(revenueA/campaignA_closed).toFixed(2)}`)
console.log(`Campaign B: $${revenueB} / ${campaignB_closed} = $${(revenueB/campaignB_closed).toFixed(2)}`)
console.log(`Campaign C: $${revenueC} / ${campaignC_closed} = $${(revenueC/campaignC_closed).toFixed(2)}`)