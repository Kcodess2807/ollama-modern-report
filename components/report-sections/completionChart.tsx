"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface CompletionChartProps {
  data: any
}

export function CompletionChart({ data }: CompletionChartProps) {
  // Component status distribution
  const chartData = [
    { name: "Completed", value: data.components.completed, color: "#2563eb" },
    { name: "In Progress", value: data.components.inProgress, color: "#3b82f6" },
    { name: "Pending", value: data.components.pending, color: "#93c5fd" },
  ]

  // Phase analysis data
  const phaseData = [
    {
      phase: "Raw Phase",
      completion: data.phaseAnalysis?.rawPhaseCompletion || 0,
      color: "#ef4444",
    },
    {
      phase: "Finished Phase",
      completion: data.phaseAnalysis?.finishedPhaseCompletion || 0,
      color: "#22c55e",
    },
  ]

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div id="completion-chart" className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Project Completion Overview</h1>
          <p className="text-blue-700 text-lg">Component status distribution and phase analysis</p>
        </div>

        {/* Phase Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/90 backdrop-blur-xl border-blue-200">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6">Phase Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={phaseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
                    <XAxis dataKey="phase" stroke="rgba(30, 64, 175, 0.8)" fontSize={12} />
                    <YAxis stroke="rgba(30, 64, 175, 0.8)" fontSize={12} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid #3b82f6",
                        borderRadius: "8px",
                        color: "#1e40af",
                      }}
                    />
                    <Bar dataKey="completion" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-blue-700">Progress Gap:</span>
                  <span className="font-semibold text-blue-900">{data.phaseAnalysis?.progressGap || 0}%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-blue-700">Estimated Timespan:</span>
                  <span className="font-semibold text-blue-900">{data.phaseAnalysis?.estimatedTimespan || "N/A"}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Component Distribution */}
          <Card className="bg-white/90 backdrop-blur-xl border-blue-200">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6 text-center">Component Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid #3b82f6",
                        borderRadius: "8px",
                        color: "#1e40af",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-6 mt-4">
                {chartData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-blue-800 text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-xl border-blue-300">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{data.components.completed}</div>
              <div className="text-blue-700">Completed</div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300 mt-2">✓ Done</Badge>
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-xl border-blue-300">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">{data.components.inProgress}</div>
              <div className="text-blue-700">In Progress</div>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 mt-2">🔄 Active</Badge>
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-xl border-blue-300">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{data.components.pending}</div>
              <div className="text-blue-700">Pending</div>
              <Badge className="bg-blue-50 text-blue-600 border-blue-200 mt-2">⏳ Waiting</Badge>
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-xl border-blue-300">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">{data.components.total}</div>
              <div className="text-blue-700">Total Components</div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300 mt-2">📊 Total</Badge>
            </div>
          </Card>
        </div>

        {/* Quality Consistency Analysis */}
        <Card className="bg-white/90 backdrop-blur-xl border-blue-200">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Quality Consistency Analysis</h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-blue-800 leading-relaxed">
                {data.phaseAnalysis?.qualityConsistency || "Quality analysis not available."}
              </p>
            </div>
          </div>
        </Card>

        {/* Summary Section */}
        {data.summary && (
          <Card className="bg-white/90 backdrop-blur-xl border-blue-200 mt-8">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6">Project Summary</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-green-700 mb-3">Key Strengths</h4>
                  <ul className="space-y-2">
                    {data.summary.keyStrengths?.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-red-700 mb-3">Key Deficiencies</h4>
                  <ul className="space-y-2">
                    {data.summary.keyDeficiencies?.map((deficiency: string, index: number) => (
                      <li key={index} className="flex items-start text-red-600">
                        <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{deficiency}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {data.summary.recommendations?.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start text-blue-600">
                      <span className="mr-2 mt-1 text-blue-500">→</span>
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
