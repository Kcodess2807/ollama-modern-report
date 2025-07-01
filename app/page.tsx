import { ConstructionReport } from "@/components/construction-report"

// Sample data structure for development/testing
const sampleReportData = {
  siteInfo: {
    name: "Skyline Tower Construction",
    location: "Downtown District, Phase 2",
    date: "2024-01-15",
    reportId: "RPT-2024-001",
    supervisor: "John Mitchell",
    weather: "Sunny, 22°C",
  },
  images: {
    current: "/placeholder.svg?height=400&width=600",
    render: "/placeholder.svg?height=400&width=600",
  },
  metrics: {
    overallCompletion: 68,
    structuralIntegrity: 92,
    alignmentAccuracy: 87,
    qualityScore: 91,
    safetyCompliance: 95,
    scheduleAdherence: 73,
  },
  components: {
    completed: 12,
    inProgress: 5,
    pending: 8,
    total: 25,
  },
  componentStatus: [
    { name: "Foundation", status: "completed", progress: 100, priority: "high" },
    { name: "Steel Framework", status: "completed", progress: 100, priority: "high" },
    { name: "Concrete Pouring", status: "completed", progress: 100, priority: "high" },
    { name: "Electrical Rough-in", status: "in-progress", progress: 75, priority: "medium" },
    { name: "Plumbing Installation", status: "in-progress", progress: 60, priority: "medium" },
    { name: "HVAC Systems", status: "in-progress", progress: 45, priority: "medium" },
    { name: "Insulation", status: "pending", progress: 0, priority: "low" },
    { name: "Drywall", status: "pending", progress: 0, priority: "low" },
    { name: "Flooring", status: "pending", progress: 0, priority: "low" },
    { name: "Windows & Doors", status: "in-progress", progress: 30, priority: "high" },
    { name: "Exterior Cladding", status: "pending", progress: 0, priority: "medium" },
    { name: "Interior Finishes", status: "pending", progress: 0, priority: "low" },
  ],
  historicalData: [
    { date: "2024-01-01", completion: 45, quality: 88, safety: 92 },
    { date: "2024-01-05", completion: 52, quality: 89, safety: 94 },
    { date: "2024-01-10", completion: 61, quality: 90, safety: 93 },
    { date: "2024-01-15", completion: 68, quality: 91, safety: 95 },
  ],
  insights: {
    aiSummary:
      "Construction progress is on track with excellent safety compliance. Electrical and plumbing work showing good advancement. Weather conditions have been favorable for outdoor activities.",
    recommendations: [
      "Accelerate window installation to maintain schedule",
      "Coordinate HVAC and electrical teams to avoid conflicts",
      "Schedule quality inspection for completed structural work",
      "Prepare materials for upcoming insulation phase",
    ],
    risks: [
      { level: "low", description: "Minor delay in window delivery" },
      { level: "medium", description: "Weather forecast shows rain next week" },
    ],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      <ConstructionReport data={sampleReportData} />
    </div>
  )
}
