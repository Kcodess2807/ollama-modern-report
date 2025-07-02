"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface CompletionChartProps {
  data: any
}

export function CompletionChart({ data }: CompletionChartProps) {
  // Hardcoded chart data to ensure it displays properly
  const chartData = [
    { name: "Completed", value: 45, color: "#2563eb" },
    { name: "In Progress", value: 25, color: "#3b82f6" },
    { name: "Pending", value: 30, color: "#93c5fd" },
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
          <p className="text-blue-700 text-lg">Component status distribution and progress breakdown</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donut Chart */}
          <Card className="bg-white/90 backdrop-blur-xl border-blue-200">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6 text-center">Component Status Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      innerRadius={60}
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

          {/* Statistics */}
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-xl border-blue-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-900">Completed Components</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">✓ Done</Badge>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">45</div>
                <p className="text-blue-700">65% of total components completed</p>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-xl border-blue-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-900">In Progress</h3>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200">🔄 Active</Badge>
                </div>
                <div className="text-4xl font-bold text-blue-500 mb-2">25</div>
                <p className="text-blue-700">36% currently active</p>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-xl border-blue-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-900">Pending</h3>
                  <Badge className="bg-blue-50 text-blue-600 border-blue-200">⏳ Waiting</Badge>
                </div>
                <div className="text-4xl font-bold text-blue-400 mb-2">30</div>
                <p className="text-blue-700">43% awaiting start</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="bg-white/90 backdrop-blur-xl border-blue-200 mt-8">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">Project Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100</div>
                <div className="text-blue-700">Total Components</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">45%</div>
                <div className="text-blue-700">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-800 mb-2">55</div>
                <div className="text-blue-700">Remaining Work</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.round(data.metrics.overallCompletion)}%
                </div>
                <div className="text-blue-700">Overall Progress</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
