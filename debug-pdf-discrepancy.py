"""
Debug the discrepancy between PDF calculated value and expected value
PDF shows: $1,501,198.95
Expected: $1,396,148.991
Difference: $105,049.959
"""

# Check if there's a pattern or percentage difference
pdf_total = 1501198.95
expected = 1396148.991
difference = pdf_total - expected
percentage_diff = (difference / pdf_total) * 100

print(f"PDF Total: ${pdf_total:,.2f}")
print(f"Expected: ${expected:,.2f}")
print(f"Difference: ${difference:,.2f}")
print(f"Percentage difference: {percentage_diff:.2f}%")

# Check if it's related to one of the campaigns
campaign_a = 203322.66
campaign_b = 1084387.50
campaign_c = 213488.79

print(f"\nCampaign revenues:")
print(f"A: ${campaign_a:,.2f}")
print(f"B: ${campaign_b:,.2f}")
print(f"C: ${campaign_c:,.2f}")

# Check various hypotheses
print("\nHypothesis testing:")

# Maybe only counting viable leads?
viable_factor = 0.93  # 7% reduction
adjusted_total = pdf_total * viable_factor
print(f"1. 93% of total (7% reduction): ${adjusted_total:,.2f}")

# Maybe different follow-up intensity calculation?
# If medium gives less boost than calculated
reduced_b = campaign_b * 0.93
new_total_1 = campaign_a + reduced_b + campaign_c
print(f"2. Reduced Campaign B by 7%: ${new_total_1:,.2f}")

# Maybe the PDF has a calculation error in Campaign B?
# Let's see what would make it match
needed_b = expected - campaign_a - campaign_c
print(f"3. Campaign B needed for match: ${needed_b:,.2f}")
b_reduction_factor = needed_b / campaign_b
print(f"   That's {b_reduction_factor:.4f} of current Campaign B")

# Check if it's the lead quality factor
# Our code uses 0.7 for dormant leads, maybe PDF uses different value?
print(f"\n4. Lead quality factor analysis:")
print(f"   Current factor: 0.7")
print(f"   If we need {b_reduction_factor:.4f} reduction...")
print(f"   Could be using a different calculation method")
