// Fetch and process the testimonial data from the CSV file
const response = await fetch(
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Website%20feedback%20%20-%20Sheet1-EZYk7bVSgUA5igdAvqeewWv9RFiYGO.csv",
)
const csvText = await response.text()

console.log("Raw CSV Data:")
console.log(csvText)

// Parse CSV manually since it's a simple structure
const lines = csvText.trim().split("\n")
const testimonials = []

// Skip header row and process data
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim()
  if (line) {
    // Split by comma but handle quoted content
    const parts = line.split(",")
    if (parts.length >= 1) {
      const rawData = parts[0].trim().replace(/^"|"$/g, "") // Remove quotes

      // Extract role and name from format like "Sales Manager- Nick Burns"
      const match = rawData.match(/^(.+?)-\s*(.+)$/)
      if (match) {
        const role = match[1].trim()
        const name = match[2].trim()

        testimonials.push({
          name: name,
          role: role,
          rawData: rawData,
        })
      } else {
        // If format doesn't match, use as is
        testimonials.push({
          name: rawData,
          role: "Customer",
          rawData: rawData,
        })
      }
    }
  }
}

console.log("\nParsed Testimonials:")
console.log(JSON.stringify(testimonials, null, 2))

console.log(`\nTotal testimonials found: ${testimonials.length}`)
