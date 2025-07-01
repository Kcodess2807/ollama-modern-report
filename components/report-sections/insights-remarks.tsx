import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Brain, Lightbulb, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"

interface InsightsRemarksProps {
  data: any
}

export function InsightsRemarks({ data }: InsightsRemarksProps) {
  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "low":
        return <AlertTriangle className="h-5 w-5 text-green-400" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "from-red-500/20 to-red-600/20 border-red-400/30"
      case "medium":
        return "from-yellow-500/20 to-yellow-600/20 border-yellow-400/30"
      case "low":
        return "from-green-500/20 to-green-600/20 border-green-400/30"
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-400/30"
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">AI Insights & Recommendations</h1>
          <p className="text-white/70 text-lg">
            Intelligent analysis and actionable recommendations for project optimization
          </p>
        </div>

        {/* AI Summary */}
        <Card className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-xl border-orange-400/30 mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/30 to-amber-500/30">
                <Brain className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">AI-Generated Summary</h3>
              <Badge className="bg-orange-500/30 text-orange-200 border-orange-400/50">Latest Analysis</Badge>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white/90 text-lg leading-relaxed">{data.insights.aiSummary}</p>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-xl border-amber-400/30 mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-r from-amber-500/30 to-orange-500/30">
                <Lightbulb className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Strategic Recommendations</h3>
            </div>
            <div className="space-y-4">
              {data.insights.recommendations.map((recommendation: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-amber-500/30 flex items-center justify-center">
                      <span className="text-amber-400 text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/90">{recommendation}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-amber-400 flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Risk Assessment */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-r from-red-500/30 to-orange-500/30">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Risk Assessment</h3>
            </div>
            <div className="space-y-4">
              {data.insights.risks.map((risk: any, index: number) => (
                <Card key={index} className={`bg-gradient-to-br ${getRiskColor(risk.level)} backdrop-blur-xl`}>
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      {getRiskIcon(risk.level)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            className={`${
                              risk.level === "high"
                                ? "bg-red-500/30 text-red-200 border-red-400/50"
                                : risk.level === "medium"
                                  ? "bg-yellow-500/30 text-yellow-200 border-yellow-400/50"
                                  : "bg-green-500/30 text-green-200 border-green-400/50"
                            }`}
                          >
                            {risk.level.toUpperCase()} RISK
                          </Badge>
                        </div>
                        <p className="text-white/90">{risk.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Detailed Analysis Accordion */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Detailed Analysis</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="performance" className="border-white/20">
                <AccordionTrigger className="text-white hover:text-white/80">Performance Analysis</AccordionTrigger>
                <AccordionContent className="text-white/80">
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-white font-semibold mb-2">Strengths</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span>Excellent safety compliance record</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span>High structural integrity scores</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span>Consistent quality improvements</span>
                          </li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-white font-semibold mb-2">Areas for Improvement</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-400" />
                            <span>Schedule adherence needs attention</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-400" />
                            <span>Coordination between teams</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="timeline" className="border-white/20">
                <AccordionTrigger className="text-white hover:text-white/80">Timeline Optimization</AccordionTrigger>
                <AccordionContent className="text-white/80">
                  <div className="space-y-4 pt-4">
                    <p>
                      Based on current progress rates and historical data, the project timeline can be optimized
                      through:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li>• Parallel execution of electrical and plumbing work</li>
                      <li>• Early material procurement for upcoming phases</li>
                      <li>• Resource reallocation to critical path items</li>
                      <li>• Weather contingency planning for outdoor activities</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="quality" className="border-white/20">
                <AccordionTrigger className="text-white hover:text-white/80">
                  Quality Assurance Insights
                </AccordionTrigger>
                <AccordionContent className="text-white/80">
                  <div className="space-y-4 pt-4">
                    <p>Quality metrics show positive trends with the following observations:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <div className="text-green-400 font-semibold">Excellent</div>
                        <div className="text-sm">Structural work quality</div>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <div className="text-blue-400 font-semibold">Good</div>
                        <div className="text-sm">Material specifications</div>
                      </div>
                      <div className="p-3 bg-yellow-500/10 rounded-lg">
                        <div className="text-yellow-400 font-semibold">Monitor</div>
                        <div className="text-sm">Finishing standards</div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>

        {/* Action Items */}
        <Card className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-xl border-orange-400/30 mt-8">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Next Steps & Action Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Immediate Actions (Next 7 Days)</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <span className="text-white/90">Schedule window installation coordination meeting</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <span className="text-white/90">Conduct quality inspection for completed structural work</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-white/90">Review weather forecast and adjust outdoor activities</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Medium-term Goals (Next 30 Days)</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-white/90">Complete electrical and plumbing rough-in</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span className="text-white/90">Begin insulation and drywall preparation</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="text-white/90">Finalize exterior cladding material selection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
