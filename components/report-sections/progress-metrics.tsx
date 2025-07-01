"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, Target, Clock, Award, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

interface ProgressMetricsProps {
  data: any
}

export function ProgressMetrics({ data }: ProgressMetricsProps) {
  const [animatedValues, setAnimatedValues] = useState({
    overallCompletion: 0,
    structuralIntegrity: 0,
    alignmentAccuracy: 0,
    qualityScore: 0,
    safetyCompliance: 0,
    scheduleAdherence: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(data.metrics)
    }, 500)
    return () => clearTimeout(timer)
  }, [data.metrics])

  const metrics = [
    {
      key: "overallCompletion",
      label: "Overall Completion",
      icon: TrendingUp,
      color: "blue",
      description: "Total project progress",
    },
    {
      key: "structuralIntegrity",
      label: "Structural Integrity",
      icon: Shield,
      color: "green",
      description: "Build quality assessment",
    },
    {
      key: "alignmentAccuracy",
      label: "Design Alignment",
      icon: Target,
      color: "purple",
      description: "Adherence to specifications",
    },
    {
      key: "qualityScore",
      label: "Quality Score",
      icon: Award,
      color: "yellow",
      description: "Workmanship evaluation",
    },
    {
      key: "safetyCompliance",
      label: "Safety Compliance",
      icon: Shield,
      color: "red",
      description: "Safety standards adherence",
    },
    {
      key: "scheduleAdherence",
      label: "Schedule Adherence",
      icon: Clock,
      color: "indigo",
      description: "Timeline performance",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-orange-500/20 to-orange-600/20 border-orange-400/30 text-orange-400",
      green: "from-green-500/20 to-green-600/20 border-green-400/30 text-green-400",
      purple: "from-amber-500/20 to-amber-600/20 border-amber-400/30 text-amber-400",
      yellow: "from-yellow-500/20 to-yellow-600/20 border-yellow-400/30 text-yellow-400",
      red: "from-red-500/20 to-red-600/20 border-red-400/30 text-red-400",
      indigo: "from-orange-600/20 to-amber-600/20 border-orange-400/30 text-orange-400",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getStatusBadge = (value: number) => {
    if (value >= 90)
      return { text: "Excellent", variant: "default", className: "bg-green-500/20 text-green-200 border-green-400/30" }
    if (value >= 75)
      return { text: "Good", variant: "secondary", className: "bg-orange-500/20 text-orange-200 border-orange-400/30" }
    if (value >= 60)
      return { text: "Fair", variant: "secondary", className: "bg-yellow-500/20 text-yellow-200 border-yellow-400/30" }
    return {
      text: "Needs Attention",
      variant: "destructive",
      className: "bg-red-500/20 text-red-200 border-red-400/30",
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Progress Metrics Dashboard</h1>
          <p className="text-white/70 text-lg">Real-time performance indicators and quality assessments</p>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => {
            const IconComponent = metric.icon
            const value = animatedValues[metric.key as keyof typeof animatedValues]
            const status = getStatusBadge(value)

            return (
              <Card
                key={metric.key}
                className={`bg-gradient-to-br ${getColorClasses(metric.color)} backdrop-blur-xl border-white/20 hover:scale-105 transition-all duration-300`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses(metric.color)}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <Badge className={status.className}>{status.text}</Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{metric.label}</h3>
                  <p className="text-sm text-white/60 mb-4">{metric.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-white">{value}%</span>
                      {value < 75 && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
                    </div>

                    <Progress value={value} className="h-3 bg-white/10" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Performance Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Average Score:</span>
                  <span className="text-2xl font-bold text-white">
                    {Math.round(
                      Object.values(data.metrics).reduce((a, b) => a + b, 0) / Object.values(data.metrics).length,
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Highest Metric:</span>
                  <span className="text-green-400 font-semibold">
                    Safety Compliance ({data.metrics.safetyCompliance}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Needs Focus:</span>
                  <span className="text-yellow-400 font-semibold">
                    Schedule Adherence ({data.metrics.scheduleAdherence}%)
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quality Indicators</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Build Quality:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-white">Excellent</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Safety Status:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-white">Compliant</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Timeline Status:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span className="text-white">Monitor</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
