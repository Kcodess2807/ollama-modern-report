import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, CloudSun } from "lucide-react"

interface CoverPageProps {
  data: any
}

export function CoverPage({ data }: CoverPageProps) {
  return (
    <div id="cover-page" className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Main Title Card */}
        <Card className="bg-white/90 backdrop-blur-xl border-blue-200 shadow-2xl mb-8">
          <div className="p-12 text-center">
            <div className="mb-6">
              <div className="inline-block p-4 rounded-full bg-blue-50 border border-blue-200 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">🏗️</span>
                </div>
              </div>
            </div>

            <h1 className="text-5xl font-bold text-blue-900 mb-4">Construction Progress Report</h1>

            <h2 className="text-3xl font-semibold text-blue-700 mb-6">Project Dashboard</h2>

            <div className="flex items-center justify-center space-x-2 mb-8">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300 px-4 py-2">
                {data.metrics.overallCompletion}% Complete
              </Badge>
              <Badge variant="secondary" className="bg-white text-blue-700 border-blue-200 px-4 py-2">
                {data.components.completed}/{data.components.total} Components Done
              </Badge>
            </div>
          </div>
        </Card>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Report Date</h3>
              </div>
              <p className="text-2xl font-bold text-blue-800">{data.siteInfo.date}</p>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Location</h3>
              </div>
              <p className="text-lg text-blue-800">{data.siteInfo.location}</p>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Supervisor</h3>
              </div>
              <p className="text-lg text-blue-800">{data.siteInfo.supervisor}</p>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <CloudSun className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Weather</h3>
              </div>
              <p className="text-lg text-blue-800">{data.siteInfo.weather}</p>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-blue-600 text-sm">
            Generated on {new Date().toLocaleDateString()} • Confidential Document
          </p>
        </div>
      </div>
    </div>
  )
}
