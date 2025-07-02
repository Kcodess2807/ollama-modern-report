"use client"

import { useState } from "react"
import { CoverPage } from "./report-sections/cover-page"
import { ImageComparison } from "./report-sections/image-comparison"
import { ProgressMetrics } from "./report-sections/progress-metrics"
import { CompletionChart } from "./report-sections/completion-chart"
import { ComponentStatus } from "./report-sections/component-status"
import { HistoricalTrends } from "./report-sections/historical-trends"
import { InsightsRemarks } from "./report-sections/insights-remarks"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PDFGenerator } from "./pdf"

interface ConstructionReportProps {
  data: any
}

export function ConstructionReport({ data }: ConstructionReportProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const pages = [
    { title: "Cover", component: <CoverPage data={data} /> },
    { title: "Image Comparison", component: <ImageComparison data={data} /> },
    { title: "Progress Metrics", component: <ProgressMetrics data={data} /> },
    { title: "Completion Overview", component: <CompletionChart data={data} /> },
    { title: "Component Status", component: <ComponentStatus data={data} /> },
    { title: "Historical Trends", component: <HistoricalTrends data={data} /> },
    { title: "Insights & Remarks", component: <InsightsRemarks data={data} /> },
  ]

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-blue-600 hover:bg-blue-50 border border-blue-200"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="text-blue-800 text-sm font-medium">
              Page {currentPage + 1} of {pages.length} - {pages[currentPage].title}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className="text-blue-600 hover:bg-blue-50 border border-blue-200"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <PDFGenerator data={data} currentPage={currentPage} />
        </div>
      </div>

      {/* Page Content */}
      <div className="pt-16">{pages[currentPage].component}</div>

      {/* Page Indicators */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-2 bg-white/90 backdrop-blur-md rounded-full p-3 border border-blue-200 shadow-lg">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? "bg-blue-600 scale-125 shadow-lg shadow-blue-600/50"
                  : "bg-blue-200 hover:bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
