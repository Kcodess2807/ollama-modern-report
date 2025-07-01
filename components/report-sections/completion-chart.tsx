"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface CompletionChartProps {
  data: any
}

export function CompletionChart({ data }: CompletionChartProps) {
  const chartData = [
    { name: "Completed", value: data.components.completed, color: "#10B981" },
    { name: "In Progress", value: data.components.inProgress, color: "#F97316" },
    { name: "Pending", value: data.components.pending, color: "#6B7280" },
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
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Project Completion Overview</h1>
          <p className="text-white/70 text-lg">Component status distribution and progress breakdown</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donut Chart */}
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Component Status Distribution</h3>
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
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        color: "white",
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
                    <span className="text-white/80 text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Statistics */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl border-green-400/30">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Completed Components</h3>
                  <Badge className="bg-green-500/30 text-green-200 border-green-400/50">✓ Done</Badge>
                </div>
                <div className="text-4xl font-bold text-green-400 mb-2">{data.components.completed}</div>
                <p className="text-green-200/80">
                  {((data.components.completed / data.components.total) * 100).toFixed(1)}% of total components
                </p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-xl border-orange-400/30">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">In Progress</h3>
                  <Badge className="bg-orange-500/30 text-orange-200 border-orange-400/50">🔄 Active</Badge>
                </div>
                <div className="text-4xl font-bold text-orange-400 mb-2">{data.components.inProgress}</div>
                <p className="text-orange-200/80">
                  {((data.components.inProgress / data.components.total) * 100).toFixed(1)}% currently active
                </p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur-xl border-gray-400/30">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Pending</h3>
                  <Badge className="bg-gray-500/30 text-gray-200 border-gray-400/50">⏳ Waiting</Badge>
                </div>
                <div className="text-4xl font-bold text-gray-400 mb-2">{data.components.pending}</div>
                <p className="text-gray-200/80">
                  {((data.components.pending / data.components.total) * 100).toFixed(1)}% awaiting start
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 mt-8">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Project Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{data.components.total}</div>
                <div className="text-white/70">Total Components</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {Math.round((data.components.completed / data.components.total) * 100)}%
                </div>
                <div className="text-white/70">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {data.components.inProgress + data.components.pending}
                </div>
                <div className="text-white/70">Remaining Work</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {Math.round(data.metrics.overallCompletion)}%
                </div>
                <div className="text-white/70">Overall Progress</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
