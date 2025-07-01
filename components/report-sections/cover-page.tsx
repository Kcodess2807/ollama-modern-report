import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, CloudSun } from "lucide-react"

interface CoverPageProps {
  data: any
}

export function CoverPage({ data }: CoverPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Main Title Card */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 shadow-2xl mb-8">
          <div className="p-12 text-center">
            <div className="mb-6">
              <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">🏗️</span>
                </div>
              </div>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Daily Progress Report
            </h1>

            <h2 className="text-3xl font-semibold text-white/90 mb-6">{data.siteInfo.name}</h2>

            <div className="flex items-center justify-center space-x-2 mb-8">
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-200 border-orange-400/30">
                Report ID: {data.siteInfo.reportId}
              </Badge>
              <Badge variant="secondary" className="bg-amber-500/20 text-amber-200 border-amber-400/30">
                {data.metrics.overallCompletion}% Complete
              </Badge>
            </div>
          </div>
        </Card>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Calendar className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Report Date</h3>
              </div>
              <p className="text-2xl font-bold text-white/90">{data.siteInfo.date}</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <MapPin className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Location</h3>
              </div>
              <p className="text-lg text-white/90">{data.siteInfo.location}</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <User className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Supervisor</h3>
              </div>
              <p className="text-lg text-white/90">{data.siteInfo.supervisor}</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <CloudSun className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Weather</h3>
              </div>
              <p className="text-lg text-white/90">{data.siteInfo.weather}</p>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            Generated on {new Date().toLocaleDateString()} • Confidential Document
          </p>
        </div>
      </div>
    </div>
  )
}
