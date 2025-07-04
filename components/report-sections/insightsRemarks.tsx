import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Brain, Lightbulb, AlertTriangle, CheckCircle, ArrowRight, TrendingUp } from "lucide-react"

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
          <h1 className="text-4xl font-bold text-blue-900 mb-4">AI Insights & Analysis</h1>
          <p className="text-blue-700 text-lg">
            Comprehensive analysis and actionable recommendations for project optimization
          </p>
        </div>

        {/* Phase Analysis Summary */}
        {data.phaseAnalysis && (
          <Card className="bg-white/90 backdrop-blur-xl border-blue-300 mb-8">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-100 border border-blue-200">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-blue-900">Phase Analysis Overview</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600">{data.phaseAnalysis.rawPhaseCompletion}%</div>
                  <div className="text-blue-700 text-sm">Raw Phase</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="text-2xl font-bold text-green-600">{data.phaseAnalysis.finishedPhaseCompletion}%</div>
                  <div className="text-green-700 text-sm">Finished Phase</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                  <div className="text-2xl font-bold text-amber-600">{data.phaseAnalysis.progressGap}%</div>
                  <div className="text-amber-700 text-sm">Progress Gap</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">Quality Consistency Analysis:</h4>
                <p className="text-blue-800 text-sm leading-relaxed">{data.phaseAnalysis.qualityConsistency}</p>
              </div>
            </div>
          </Card>
        )}

        {/* AI Summary */}
        <Card className="bg-white/90 backdrop-blur-xl border-blue-300 mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-blue-100 border border-blue-200">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900">AI-Generated Analysis</h3>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">Latest Analysis</Badge>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <p className="text-blue-800 text-lg leading-relaxed">{data.insights.aiSummary}</p>
            </div>
          </div>
        </Card>

        {/* Strategic Recommendations */}
        <Card className="bg-white/90 backdrop-blur-xl border-blue-200 mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-lg bg-blue-100 border border-blue-200">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900">Strategic Recommendations</h3>
            </div>
            <div className="space-y-4">
              {data.insights.recommendations?.map((recommendation: string, index: number) => (
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
              {data.insights.risks?.map((risk: any, index: number) => (
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

        {/* Project Summary Insights */}
        {data.summary && (
          <Card className="bg-white/90 backdrop-blur-xl border-blue-200 mb-8">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6">Project Performance Summary</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Key Strengths
                  </h4>
                  <div className="space-y-3">
                    {data.summary.keyStrengths?.map((strength: string, index: number) => (
                      <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-100">
                        <p className="text-green-800 text-sm">{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Critical Issues
                  </h4>
                  <div className="space-y-3">
                    {data.summary.keyDeficiencies?.map((deficiency: string, index: number) => (
                      <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-100">
                        <p className="text-red-800 text-sm">{deficiency}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Detailed Analysis Accordion */}
        <Card className="bg-white/90 backdrop-blur-xl border-blue-200">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">Detailed Analysis</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="performance" className="border-blue-200">
                <AccordionTrigger className="text-blue-900 hover:text-blue-700">
                  Performance Metrics Analysis
                </AccordionTrigger>
                <AccordionContent className="text-blue-800">
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
                        <div className="text-2xl font-bold text-blue-600">{data.metrics.overallCompletion}%</div>
                        <div className="text-xs text-blue-700">Overall Completion</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
                        <div className="text-2xl font-bold text-blue-600">{data.metrics.structuralIntegrity}%</div>
                        <div className="text-xs text-blue-700">Structural Integrity</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
                        <div className="text-2xl font-bold text-blue-600">{data.metrics.qualityScore}%</div>
                        <div className="text-xs text-blue-700">Quality Score</div>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg border border-red-100 text-center">
                        <div className="text-2xl font-bold text-red-600">{data.metrics.safetyCompliance}%</div>
                        <div className="text-xs text-red-700">Safety Compliance</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
                        <div className="text-2xl font-bold text-blue-600">{data.metrics.scheduleAdherence}%</div>
                        <div className="text-xs text-blue-700">Schedule Adherence</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
                        <div className="text-2xl font-bold text-blue-600">{data.metrics.alignmentAccuracy}%</div>
                        <div className="text-xs text-blue-700">Alignment Accuracy</div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="timeline" className="border-blue-200">
                <AccordionTrigger className="text-blue-900 hover:text-blue-700">
                  Timeline & Phase Analysis
                </AccordionTrigger>
                <AccordionContent className="text-blue-800">
                  <div className="space-y-4 pt-4">
                    <p className="mb-4">
                      Current project timeline analysis shows significant gaps between raw and finished phases:
                    </p>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <h4 className="font-semibold text-amber-800 mb-2">Timeline Estimate:</h4>
                      <p className="text-amber-700">{data.phaseAnalysis?.estimatedTimespan}</p>
                    </div>
                    <ul className="space-y-2 ml-4">
                      <li>
                        • Raw phase completion at {data.phaseAnalysis?.rawPhaseCompletion}% indicates foundational work
                        progress
                      </li>
                      <li>
                        • Finished phase projection at {data.phaseAnalysis?.finishedPhaseCompletion}% shows final
                        quality expectations
                      </li>
                      <li>• {data.phaseAnalysis?.progressGap}% gap requires strategic resource allocation</li>
                      <li>• Critical systems (HVAC, plumbing) need immediate attention</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="quality" className="border-blue-200">
                <AccordionTrigger className="text-blue-900 hover:text-blue-700">
                  Quality Assurance & Safety
                </AccordionTrigger>
                <AccordionContent className="text-blue-800">
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Quality Highlights</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Structural integrity at {data.metrics.structuralIntegrity}%</li>
                          <li>• Quality score maintaining {data.metrics.qualityScore}%</li>
                          <li>• Alignment accuracy at {data.metrics.alignmentAccuracy}%</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2">Critical Safety Issues</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Safety compliance critically low at {data.metrics.safetyCompliance}%</li>
                          <li>• Immediate regulatory attention required</li>
                          <li>• Risk of project delays due to safety violations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>
      </div>
    </div>
  )
}
