import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Camera, Target } from "lucide-react"

interface ImageComparisonProps {
  data: any
}

export function ImageComparison({ data }: ImageComparisonProps) {
  return (
    <div id="image-comparison" className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Visual Progress Comparison</h1>
          <p className="text-blue-700 text-lg">Current site status vs. architectural render</p>
        </div>

        <Tabs defaultValue="side-by-side" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/90 backdrop-blur-sm border border-blue-200">
            <TabsTrigger value="side-by-side" className="data-[state=active]:bg-blue-100 text-blue-900">
              Side by Side
            </TabsTrigger>
            <TabsTrigger value="overlay" className="data-[state=active]:bg-blue-100 text-blue-900">
              Overlay View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="side-by-side" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Photo */}
              <Card className="bg-white/90 backdrop-blur-xl border-blue-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                      <Camera className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900">Current Site Photo</h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300">
                      Live
                    </Badge>
                  </div>
                  <div className="relative group">
                    <img
                      src={data.images?.current || "/placeholder.svg?height=320&width=480"}
                      alt="Current construction site"
                      className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Captured:</span>
                      <span className="text-blue-900">{data.siteInfo.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Weather:</span>
                      <span className="text-blue-900">{data.siteInfo.weather}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Architectural Render */}
              <Card className="bg-white/90 backdrop-blur-xl border-blue-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                      <Target className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900">Target Design</h3>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                      Reference
                    </Badge>
                  </div>
                  <div className="relative group">
                    <img
                      src={data.images?.render || "/placeholder.svg?height=320&width=480"}
                      alt="Architectural render"
                      className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Alignment Score:</span>
                      <span className="text-blue-900 font-semibold">{data.metrics.alignmentAccuracy}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Structural Match:</span>
                      <span className="text-blue-900 font-semibold">{data.metrics.structuralIntegrity}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="overlay" className="mt-8">
            <Card className="bg-white/90 backdrop-blur-xl border-blue-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Overlay Analysis</h3>
                <div className="relative">
                  <img
                    src={data.images?.current || "/placeholder.svg?height=384&width=768"}
                    alt="Overlay comparison"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg mix-blend-overlay" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{data.metrics.alignmentAccuracy}%</div>
                          <div className="text-xs text-blue-700">Alignment</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{data.metrics.structuralIntegrity}%</div>
                          <div className="text-xs text-blue-700">Structure</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-800">{data.metrics.overallCompletion}%</div>
                          <div className="text-xs text-blue-700">Progress</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
