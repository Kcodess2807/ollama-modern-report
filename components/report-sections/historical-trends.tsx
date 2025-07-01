"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface HistoricalTrendsProps {
  data: any
}

export function HistoricalTrends({ data }: HistoricalTrendsProps) {
  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-400" />
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-400" />
    return <Minus className="h-4 w-4 text-gray-400" />
  }

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return "text-green-400"
    if (current < previous) return "text-red-400"
    return "text-gray-400"
  }

  const calculateTrend = (data: any[], key: string) => {
    if (data.length < 2) return 0
    const latest = data[data.length - 1][key]
    const previous = data[data.length - 2][key]
    return (((latest - previous) / previous) * 100).toFixed(1)
  }

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3">
          <p className="text-white font-semibold mb-2">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value}%`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Historical Trends & Analytics</h1>
          <p className="text-white/70 text-lg">Progress tracking over time with trend analysis</p>
        </div>

        {/* Trend Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-xl border-orange-400/30">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Completion Trend</h3>
                {getTrendIcon(
                  data.historicalData[data.historicalData.length - 1].completion,
                  data.historicalData[data.historicalData.length - 2]?.completion || 0,
                )}
              </div>
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {data.historicalData[data.historicalData.length - 1].completion}%
              </div>
              <div
                className={`text-sm ${getTrendColor(
                  data.historicalData[data.historicalData.length - 1].completion,
                  data.historicalData[data.historicalData.length - 2]?.completion || 0,
                )}`}
              >
                {calculateTrend(data.historicalData, "completion")}% from last report
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl border-green-400/30">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Quality Trend</h3>
                {getTrendIcon(
                  data.historicalData[data.historicalData.length - 1].quality,
                  data.historicalData[data.historicalData.length - 2]?.quality || 0,
                )}
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">
                {data.historicalData[data.historicalData.length - 1].quality}%
              </div>
              <div
                className={`text-sm ${getTrendColor(
                  data.historicalData[data.historicalData.length - 1].quality,
                  data.historicalData[data.historicalData.length - 2]?.quality || 0,
                )}`}
              >
                {calculateTrend(data.historicalData, "quality")}% from last report
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl border-purple-400/30">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Safety Trend</h3>
                {getTrendIcon(
                  data.historicalData[data.historicalData.length - 1].safety,
                  data.historicalData[data.historicalData.length - 2]?.safety || 0,
                )}
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {data.historicalData[data.historicalData.length - 1].safety}%
              </div>
              <div
                className={`text-sm ${getTrendColor(
                  data.historicalData[data.historicalData.length - 1].safety,
                  data.historicalData[data.historicalData.length - 2]?.safety || 0,
                )}`}
              >
                {calculateTrend(data.historicalData, "safety")}% from last report
              </div>
            </div>
          </Card>
        </div>

        {/* Main Chart */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 mb-8">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Progress Timeline</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} domain={[0, 100]} />
                  <Tooltip content={customTooltip} />
                  <Legend wrapperStyle={{ color: "rgba(255,255,255,0.8)" }} />
                  <Line
                    type="monotone"
                    dataKey="completion"
                    stroke="#F97316"
                    strokeWidth={3}
                    dot={{ fill: "#F97316", strokeWidth: 2, r: 6 }}
                    name="Completion %"
                  />
                  <Line
                    type="monotone"
                    dataKey="quality"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                    name="Quality Score"
                  />
                  <Line
                    type="monotone"
                    dataKey="safety"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ fill: "#F59E0B", strokeWidth: 2, r: 6 }}
                    name="Safety Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Performance Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Performance Insights</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">Best Performance Day:</span>
                  <span className="text-green-400 font-semibold">
                    {
                      data.historicalData.reduce((best: any, current: any) =>
                        current.completion > best.completion ? current : best,
                      ).date
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">Average Progress Rate:</span>
                  <span className="text-blue-400 font-semibold">
                    {(
                      data.historicalData.reduce((sum: number, item: any) => sum + item.completion, 0) /
                      data.historicalData.length
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">Quality Consistency:</span>
                  <span className="text-purple-400 font-semibold">
                    {(
                      100 -
                      (Math.max(...data.historicalData.map((d: any) => d.quality)) -
                        Math.min(...data.historicalData.map((d: any) => d.quality)))
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Velocity Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">Daily Progress Rate:</span>
                  <span className="text-orange-400 font-semibold">
                    {(
                      (data.historicalData[data.historicalData.length - 1].completion -
                        data.historicalData[0].completion) /
                      (data.historicalData.length - 1)
                    ).toFixed(1)}
                    % per day
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">Projected Completion:</span>
                  <span className="text-amber-400 font-semibold">
                    {Math.ceil(
                      (100 - data.historicalData[data.historicalData.length - 1].completion) /
                        ((data.historicalData[data.historicalData.length - 1].completion -
                          data.historicalData[0].completion) /
                          (data.historicalData.length - 1)),
                    )}{" "}
                    days
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">Momentum:</span>
                  <span
                    className={`font-semibold ${
                      calculateTrend(data.historicalData, "completion") > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {Number.parseFloat(calculateTrend(data.historicalData, "completion")) > 0
                      ? "Accelerating"
                      : "Decelerating"}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
