import { ConstructionReport } from "@/components/construction-report"

// Sample data structure for development/testing
const sampleReportData = {
  siteInfo: {
    date: "2025-07-01",
    location: "Downtown Project Site",
    supervisor: "Arush Karnatak",
    weather: "Thunderstorm, 19°C",
  },
  metrics: {
    overallCompletion: 10,
    structuralIntegrity: 30,
    alignmentAccuracy: 52,
    qualityScore: 80,
    safetyCompliance: 92,
    scheduleAdherence: 74,
  },
  components: {
    completed: 39,
    inProgress: 10,
    pending: 3,
    total: 52,
  },
  componentDetails: [
    { name: "Foundation", status: "completed" },
    { name: "Framing", status: "completed" },
    { name: "Roofing", status: "inProgress" },
    { name: "Electrical", status: "inProgress" },
    { name: "Plumbing", status: "completed" },
    { name: "HVAC", status: "pending" },
    { name: "Windows", status: "completed" },
    { name: "Painting", status: "inProgress" },
    { name: "Flooring", status: "pending" },
    { name: "Landscaping", status: "pending" },
  ],
  historicalTrends: [
    { date: "2025-06-01", completion: 40 },
    { date: "2025-06-15", completion: 55 },
    { date: "2025-06-22", completion: 65 },
    { date: "2025-06-29", completion: 73 },
    { date: "2025-07-01", completion: 78 },
  ],
  insights: {
    aiSummary:
      "Project progress is steady with most critical components completed. Safety compliance is high, but schedule adherence requires attention due to recent delays in HVAC and flooring.",
    recommendations: [
      "Allocate additional resources to HVAC and flooring to improve schedule adherence.",
      "Continue current safety protocols to maintain compliance.",
    ],
    risks: [
      {
        level: "medium",
        description: "Potential delay in HVAC installation due to supply chain issues.",
      },
    ],
  },
  // Add placeholder images for the image comparison section
  images: {
    current: "/placeholder.svg?height=400&width=600",
    render: "/placeholder.svg?height=400&width=600",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <ConstructionReport data={sampleReportData} />
    </div>
  )
}
