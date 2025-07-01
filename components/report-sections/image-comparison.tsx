import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Camera, Target } from "lucide-react"

interface ImageComparisonProps {
  data: any
}

export function ImageComparison({ data }: ImageComparisonProps) {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Visual Progress Comparison</h1>
          <p className="text-white/70 text-lg">Current site status vs. architectural render</p>
        </div>

        <Tabs defaultValue="side-by-side" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="side-by-side" className="data-[state=active]:bg-white/20">
              Side by Side
            </TabsTrigger>
            <TabsTrigger value="overlay" className="data-[state=active]:bg-white/20">
              Overlay View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="side-by-side" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Photo */}
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <Camera className="h-5 w-5 text-orange-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Current Site Photo</h3>
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-200 border-orange-400/30">
                      Live
                    </Badge>
                  </div>
                  <div className="relative group">
                    <img
                      src={data.images.current || "/placeholder.svg"}
                      alt="Current construction site"
                      className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Captured:</span>
                      <span className="text-white">{data.siteInfo.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Weather:</span>
                      <span className="text-white">{data.siteInfo.weather}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Architectural Render */}
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-amber-500/20">
                      <Target className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Target Design</h3>
                    <Badge variant="secondary" className="bg-amber-500/20 text-amber-200 border-amber-400/30">
                      Reference
                    </Badge>
                  </div>
                  <div className="relative group">
                    <img
                      src={data.images.render || "/placeholder.svg"}
                      alt="Architectural render"
                      className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Alignment Score:</span>
                      <span className="text-white font-semibold">{data.metrics.alignmentAccuracy}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Structural Match:</span>
                      <span className="text-white font-semibold">{data.metrics.structuralIntegrity}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="overlay" className="mt-8">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Overlay Analysis</h3>
                <div className="relative">
                  <img
                    src={data.images.current || "/placeholder.svg"}
                    alt="Overlay comparison"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg mix-blend-overlay" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-orange-400">{data.metrics.alignmentAccuracy}%</div>
                          <div className="text-xs text-white/70">Alignment</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">{data.metrics.structuralIntegrity}%</div>
                          <div className="text-xs text-white/70">Structure</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-400">{data.metrics.overallCompletion}%</div>
                          <div className="text-xs text-white/70">Progress</div>
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
