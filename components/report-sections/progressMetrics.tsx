"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Shield,
  Target,
  Clock,
  Award,
  AlertTriangle,
  Circle,
  CheckCircle,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";

interface ProgressMetricsProps {
  data: any;
}

const metrics = [
  {
    key: "block",
    label: "BlockWork",
    icon: Shield,
    color: "blue",
    description: "Build quality assessment",
  },
  {
    key: "electrical",
    label: "Electrical Work",
    icon: Target,
    color: "blue",
    description: "Adherence to specifications",
  },
  {
    key: "plumbing",
    label: "Plumbing Work",
    icon: Award,
    color: "blue",
    description: "Workmanship evaluation",
  },
  {
    key: "hvac",
    label: "HVAC Work",
    icon: Shield,
    color: "blue",
    description: "Safety standards adherence",
  },
  {
    key: "ceiling",
    label: "Ceilng Work",
    icon: Shield,
    color: "blue",
    description: "Safety standards adherence",
  }, 
  {
    key: "flooring",
    label: "Flooring Work",
    icon: Clock,
    color: "blue",
    description: "Timeline performance",
  },
  {
    key: "wall",
    label: "Wall Finishes",
    icon: Clock,
    color: "blue",
    description: "Timeline performance",
  },
  {
    key: "jonery",
    label: "Joinery Work",
    icon: Clock,
    color: "blue",
    description: "Timeline performance",
  },
  {
    key: "curtain",
    label: "Curtain Work",
    icon: Clock,
    color: "blue",
    description: "Timeline performance",
  },
  {
    key: "glass",
    label: "Glass Work",
    icon: Clock,
    color: "blue",
    description: "Timeline performance",
  },
];

const getStatusBadge = (value: number) => {
  if (value >= 90)
    return {
      text: "Excellent",
      variant: "default",
      className: "bg-blue-100 text-blue-800 border-blue-300",
    };
  if (value >= 75)
    return {
      text: "Good",
      variant: "secondary",
      className: "bg-blue-50 text-blue-700 border-blue-200",
    };
  if (value >= 60)
    return {
      text: "Fair",
      variant: "secondary",
      className: "bg-blue-50 text-blue-600 border-blue-200",
    };
  return {
    text: "Needs Attention",
    variant: "destructive",
    className: "bg-red-50 text-red-700 border-red-200",
  };
};

export function ProgressMetrics({ data }: ProgressMetricsProps) {
  const [animatedValues, setAnimatedValues] = useState({
    overallCompletion: 0,
    block: 0,
    electrical: 0,
    plumbing: 0,
    hvac: 0,
    ceiling: 0,
    flooring: 0,
    wall: 0,
    jonery: 0,
    curtain: 0,
    glass: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(data.metrics);
    }, 500);
    return () => clearTimeout(timer);
  }, [data.metrics]);

  // Hardcoded worker gender distribution data
  const workerGenderData = [
    { name: "Circus Theory", value: 85, color: "#2563eb" },
    { name: "Other Firm", value: 15, color: "#3b82f6" },
  ];

  // Overall progress data for pie chart
  const overallProgressData = [
    {
      name: "Completed",
      value: data.metrics.overallCompletion,
      color: "#2563eb",
    },
    {
      name: "Remaining",
      value: 100 - data.metrics.overallCompletion,
      color: "#e5e7eb",
    },
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

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
    );
  };

  return (
    <div id="progress-metrics" className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Progress Metrics Dashboard
          </h1>
          <p className="text-blue-700 text-lg">
            Real-time performance indicators and workforce analytics
          </p>
        </div>

        

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/90 backdrop-blur-xl border-blue-200">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
                Overall Progress
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={overallProgressData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={120}
                      innerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {overallProgressData.map((entry, index) => (
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

              <div className="flex justify-center space-x-6 mt-4">
                {overallProgressData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-blue-800 text-sm">{item.name}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <div className="text-3xl font-bold text-blue-600">
                  {data.metrics.overallCompletion}%
                </div>
                <div className="text-blue-700">Project Completion</div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-xl border-blue-200">
            <div className="p-6">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <h3 className="text-2xl font-semibold text-blue-900">
                  Workforce Distribution
                </h3>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workerGenderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={120}
                      innerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {workerGenderData.map((entry, index) => (
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

              <div className="flex justify-center space-x-6 mt-4">
                {workerGenderData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-blue-800 text-sm">{item.name}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600">85</div>
                  <div className="text-blue-700 text-sm">Circus Theory</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <div className="text-blue-700 text-sm">Other Firm</div>
                </div>
              </div>

              <div className="text-center mt-4">
                <div className="text-3xl font-bold text-blue-600">100</div>
                <div className="text-blue-700">Total Workers</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="flex items-center justify-center gap-6 mb-8 ">
          <Card className="bg-white/90 backdrop-blur-xl w-[20rem] border-blue-300">
            <div className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {data.components.completed}
              </div>
              <div className="text-blue-700">Completed Task</div>
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-xl w-[20rem] border-blue-300">
            <div className="p-6 text-center">
              <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {data.components.inProgress}
              </div>
              <div className="text-blue-700">In Progress</div>
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-xl w-[20rem] border-blue-300">
            <div className="p-6 text-center">
              <Circle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {data.components.pending}
              </div>
              <div className="text-blue-700">Pending Start</div>
            </div>
          </Card>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Completion with large display */}
          <Card className="bg-white/90 backdrop-blur-xl border-blue-200 hover:scale-105 transition-all duration-300 hover:border-blue-300 md:col-span-2 lg:col-span-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <Badge
                  className={
                    getStatusBadge(animatedValues.overallCompletion).className
                  }
                >
                  {getStatusBadge(animatedValues.overallCompletion).text}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Overall Completion
              </h3>
              <p className="text-sm text-blue-700 mb-4">
                Total project progress
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-blue-800">
                    {animatedValues.overallCompletion}%
                  </span>
                  {animatedValues.overallCompletion < 75 && (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  )}
                </div>

                <Progress
                  value={animatedValues.overallCompletion}
                  className="h-3 bg-blue-100"
                />
              </div>
            </div>
          </Card>

          {/* Other metrics */}
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            const value = data.categories.subcategories?.completion[metric.key] || animatedValues[metric.key as keyof typeof animatedValues] || 0;
            const status = getStatusBadge(value);

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

                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-blue-700 mb-4">
                    {metric.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-blue-800">
                        {value}%
                      </span>
                      {value < 75 && (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      )}
                    </div>

                    <Progress value={value} className="h-3 bg-blue-100" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
