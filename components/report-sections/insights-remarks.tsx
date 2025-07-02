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
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "low":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-blue-400" />
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "from-red-50 to-red-100 border-red-200"
      case "medium":
        return "from-amber-50 to-amber-100 border-amber-200"
      case "low":
        return "from-blue-50 to-blue-100 border-blue-200"
      default:
        return "from-blue-50 to-blue-100 border-blue-200"
    }
  }

  return (
    <div id="insights-remarks" className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">AI Insights & Recommendations</h1>
          <p className="text-blue-700 text-lg">
            Intelligent analysis and actionable recommendations for project optimization
          </p>
        </div>

        {/* AI Summary */}
        <Card className="bg-white/90 backdrop-blur-xl border-blue-300 mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-blue-100 border border-blue-200">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900">AI-Generated Summary</h3>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">Latest Analysis</Badge>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <p className="text-blue-800 text-lg leading-relaxed">{data.insights.aiSummary}</p>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="bg-white/90 backdrop-blur-xl border-blue-200 mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-lg bg-blue-100 border border-blue-200">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900">Strategic Recommendations</h3>
            </div>
            <div className="space-y-4">
              {data.insights.recommendations.map((recommendation: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300 border border-blue-100"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center border border-blue-300">
                      <span className="text-blue-700 text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-800">{recommendation}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Risk Assessment */}
        <Card className="bg-white/90 backdrop-blur-xl border-blue-200 mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900">Risk Assessment</h3>
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
                                ? "bg-red-100 text-red-800 border-red-300"
                                : risk.level === "medium"
                                  ? "bg-amber-100 text-amber-800 border-amber-300"
                                  : "bg-blue-100 text-blue-800 border-blue-300"
                            }`}
                          >
                            {risk.level.toUpperCase()} RISK
                          </Badge>
                        </div>
                        <p className="text-blue-900">{risk.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Detailed Analysis Accordion */}
        <Card className="bg-white/90 backdrop-blur-xl border-blue-200">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">Detailed Analysis</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="performance" className="border-blue-200">
                <AccordionTrigger className="text-blue-900 hover:text-blue-700">Performance Analysis</AccordionTrigger>
                <AccordionContent className="text-blue-800">
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="text-blue-900 font-semibold mb-2">Strengths</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                            <span>Excellent safety compliance record</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                            <span>High quality scores maintained</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                            <span>Strong project supervision</span>
                          </li>
                        </ul>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="text-blue-900 font-semibold mb-2">Areas for Improvement</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            <span>Overall completion rate needs acceleration</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            <span>Structural integrity requires attention</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="timeline" className="border-blue-200">
                <AccordionTrigger className="text-blue-900 hover:text-blue-700">Timeline Optimization</AccordionTrigger>
                <AccordionContent className="text-blue-800">
                  <div className="space-y-4 pt-4">
                    <p>
                      Based on current progress rates and historical data, the project timeline can be optimized
                      through:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li>• Focus on HVAC and flooring completion</li>
                      <li>• Coordinate electrical and painting teams</li>
                      <li>• Weather contingency planning for outdoor work</li>
                      <li>• Resource allocation optimization</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="quality" className="border-blue-200">
                <AccordionTrigger className="text-blue-900 hover:text-blue-700">
                  Quality Assurance Insights
                </AccordionTrigger>
                <AccordionContent className="text-blue-800">
                  <div className="space-y-4 pt-4">
                    <p>Quality metrics show positive trends with the following observations:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="p-3 bg-blue-100 rounded-lg border border-blue-200">
                        <div className="text-blue-700 font-semibold">Excellent</div>
                        <div className="text-sm">Safety compliance</div>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg border border-blue-200">
                        <div className="text-blue-700 font-semibold">Good</div>
                        <div className="text-sm">Quality standards</div>
                      </div>
                      <div className="p-3 bg-amber-100 rounded-lg border border-amber-200">
                        <div className="text-amber-700 font-semibold">Monitor</div>
                        <div className="text-sm">Progress rate</div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>

        {/* Action Items */}
        <Card className="bg-white/90 backdrop-blur-xl border-blue-200 mt-8">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">Next Steps & Action Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-blue-900 mb-4">Immediate Actions (Next 7 Days)</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-blue-800">Accelerate HVAC installation process</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-blue-800">Prioritize flooring material procurement</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-blue-800">Schedule quality inspection for completed work</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-900 mb-4">Medium-term Goals (Next 30 Days)</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-blue-800">Complete electrical and painting coordination</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-blue-800">Finalize HVAC system installation</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-blue-800">Begin landscaping preparation phase</span>
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
