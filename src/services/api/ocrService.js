class OCRService {
  constructor() {
    // Mock OCR patterns for demo purposes
    this.mockPatterns = [
      {
        name: "John Smith",
        title: "Senior Developer",
        company: "TechCorp Inc.",
        email: "john.smith@techcorp.com",
        phone: "+1 (555) 123-4567",
        website: "https://techcorp.com"
      },
      {
        name: "Maria Garcia",
        title: "Marketing Director",
        company: "BrandForward",
        email: "maria.garcia@brandforward.com",
        phone: "+1 (555) 987-6543",
        website: "https://brandforward.com"
      },
      {
        name: "David Kim",
        title: "Product Manager",
        company: "StartupVentures",
        email: "david@startupventures.io",
        phone: "+1 (555) 456-7890",
        website: "https://startupventures.io"
      },
      {
        name: "Lisa Thompson",
        title: "Creative Designer",
        company: "DesignHub Studio",
        email: "lisa.thompson@designhub.co",
        phone: "+1 (555) 234-5678",
        website: "https://designhub.co"
      },
      {
        name: "Robert Chen",
        title: "Sales Executive",
        company: "GlobalSales Corp",
        email: "r.chen@globalsales.com",
        phone: "+1 (555) 345-6789",
        website: "https://globalsales.com"
      }
    ];
  }

  async extractContactInfo(imageData) {
    // Simulate OCR processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly select a mock pattern or generate one
    const randomPattern = this.mockPatterns[Math.floor(Math.random() * this.mockPatterns.length)];
    
    // Sometimes return partial data to simulate real OCR limitations
    const shouldReturnPartial = Math.random() < 0.3;
    
    if (shouldReturnPartial) {
      const partialFields = ["name", "company", "email"];
      const selectedFields = partialFields.slice(0, Math.floor(Math.random() * 2) + 1);
      
      const partialData = {};
      selectedFields.forEach(field => {
        partialData[field] = randomPattern[field];
      });
      
      return partialData;
    }
    
    // Add some variation to make it feel more realistic
    const variations = [
      { ...randomPattern },
      { ...randomPattern, website: "" }, // Sometimes no website
      { ...randomPattern, phone: randomPattern.phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3") }, // Format phone differently
      { ...randomPattern, title: randomPattern.title + " & Consultant" } // Add variation to title
    ];
    
    return variations[Math.floor(Math.random() * variations.length)];
  }

  async processImage(imageFile) {
    // Simulate image processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      processed: true,
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      imageData: imageFile
    };
  }

  validateExtractedData(data) {
const validations = {
      email: data.email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) : true,
      phone: data.phone ? /^[\d\s\-+()]+$/.test(data.phone) : true,
      website: data.website ? /^https?:\/\/.+/.test(data.website) : true
    };

    return {
      isValid: Object.values(validations).every(v => v),
      validations
    };
  }
}

export const ocrService = new OCRService();