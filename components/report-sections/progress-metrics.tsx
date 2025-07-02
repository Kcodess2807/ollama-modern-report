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
      color: "blue",
      description: "Build quality assessment",
    },
    {
      key: "alignmentAccuracy",
      label: "Design Alignment",
      icon: Target,
      color: "blue",
      description: "Adherence to specifications",
    },
    {
      key: "qualityScore",
      label: "Quality Score",
      icon: Award,
      color: "blue",
      description: "Workmanship evaluation",
    },
    {
      key: "safetyCompliance",
      label: "Safety Compliance",
      icon: Shield,
      color: "blue",
      description: "Safety standards adherence",
    },
    {
      key: "scheduleAdherence",
      label: "Schedule Adherence",
      icon: Clock,
      color: "blue",
      description: "Timeline performance",
    },
  ]

  const getStatusBadge = (value: number) => {
    if (value >= 90)
      return {
        text: "Excellent",
        variant: "default",
        className: "bg-blue-100 text-blue-800 border-blue-300",
      }
    if (value >= 75)
      return { text: "Good", variant: "secondary", className: "bg-blue-50 text-blue-700 border-blue-200" }
    if (value >= 60)
      return { text: "Fair", variant: "secondary", className: "bg-blue-50 text-blue-600 border-blue-200" }
    return {
      text: "Needs Attention",
      variant: "destructive",
      className: "bg-red-50 text-red-700 border-red-200",
    }
  }

  return (
    <div id="progress-metrics" className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Progress Metrics Dashboard</h1>
          <p className="text-blue-700 text-lg">Real-time performance indicators and quality assessments</p>
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
                className="bg-white/90 backdrop-blur-xl border-blue-200 hover:scale-105 transition-all duration-300 hover:border-blue-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge className={status.className}>{status.text}</Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-blue-900 mb-2">{metric.label}</h3>
                  <p className="text-sm text-blue-700 mb-4">{metric.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-blue-800">{value}%</span>
                      {value < 75 && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                    </div>

                    <Progress value={value} className="h-3 bg-blue-100" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/90 backdrop-blur-xl border-blue-200">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Performance Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Average Score:</span>
                  <span className="text-2xl font-bold text-blue-800">
                    {Math.round(
                      Object.values(data.metrics).reduce((a, b) => a + b, 0) / Object.values(data.metrics).length,
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Highest Metric:</span>
                  <span className="text-blue-600 font-semibold">
                    Safety Compliance ({data.metrics.safetyCompliance}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Needs Focus:</span>
                  <span className="text-amber-600 font-semibold">
                    Overall Completion ({data.metrics.overallCompletion}%)
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-xl border-blue-200">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Quality Indicators</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Build Quality:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-blue-900">Excellent</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Safety Status:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-blue-900">Compliant</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Timeline Status:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-blue-900">Monitor</span>
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
