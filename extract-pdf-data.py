import pdfplumber
import re

def extract_pdf_calculations():
    pdf_path = "/Users/node-mini-1/Documents/Projects/volv-site-v1/Data/CalculateLostRevenue - LostRevenueCalc.pdf"
    
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Total pages: {len(pdf.pages)}")
        print("\n=== EXTRACTING PDF CONTENT ===\n")
        
        full_text = ""
        for i, page in enumerate(pdf.pages):
            print(f"\n--- Page {i+1} ---")
            text = page.extract_text()
            if text:
                full_text += text + "\n"
                # Look for numbers and calculations
                # Print lines containing numbers, formulas, or key terms
                lines = text.split('\n')
                for line in lines:
                    # Look for lines with numbers, calculations, or key terms
                    if any(char.isdigit() for char in line) or \
                       any(term in line.lower() for term in ['campaign', 'revenue', 'formula', 'calculation', 'rate', 'leads', 'deals', 'show', 'conversion']):
                        print(line.strip())
        
        # Try to extract tables if any
        print("\n=== LOOKING FOR TABLES ===")
        for i, page in enumerate(pdf.pages):
            tables = page.extract_tables()
            if tables:
                print(f"\nTables found on page {i+1}:")
                for j, table in enumerate(tables):
                    print(f"\nTable {j+1}:")
                    for row in table:
                        print(" | ".join(str(cell) if cell else "" for cell in row))
        
        # Look for highlighted/yellow text patterns
        print("\n=== SEARCHING FOR HIGHLIGHTED VALUES ===")
        # Common patterns for numbers in financial documents
        number_patterns = [
            r'\$[\d,]+\.?\d*',  # Dollar amounts
            r'\d+\.?\d*%',      # Percentages
            r'\d{1,3}(?:,\d{3})*(?:\.\d+)?',  # Numbers with commas
            r'\d+(?:\.\d+)?'    # Simple numbers
        ]
        
        for pattern in number_patterns:
            matches = re.findall(pattern, full_text)
            if matches:
                print(f"\nPattern '{pattern}' matches:")
                for match in matches[:20]:  # Limit to first 20 matches
                    print(f"  {match}")

if __name__ == "__main__":
    extract_pdf_calculations()