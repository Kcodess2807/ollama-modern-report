import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Shield,
  Target,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ComponentStatusProps {
  data: any;
}

export function ComponentStatus({ data }: ComponentStatusProps) {
  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "good":
        return "text-green-600 bg-green-50 border-green-200";
      case "fair":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "poor":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return "text-green-600";
    if (completion >= 50) return "text-yellow-600";
    if (completion >= 20) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div id="component-status" className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Detailed Component Analysis
          </h1>
          <p className="text-blue-700 text-lg">
            Comprehensive breakdown of all project categories and subcategories
          </p>
        </div>

        {/* Detailed Categories */}
        <div className="space-y-8">
          {data.categories?.map((category: any, categoryIndex: number) => (
            <Card
              key={categoryIndex}
              className="bg-white/90 backdrop-blur-xl border-blue-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-blue-900">
                    {category.name}
                  </h2>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                    {category.subcategories?.length || 0} Items
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {category.subcategories?.map(
                    (subcategory: any, subIndex: number) => (
                      <Card
                        key={subIndex}
                        className="bg-blue-50/50 border-blue-100"
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-blue-900 text-sm">
                              {subcategory.name}
                            </h3>
                            <Badge
                              className={`text-xs ${getQualityColor(
                                subcategory.quality
                              )}`}
                            >
                              {subcategory.quality}
                            </Badge>
                          </div>

                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-blue-700">
                                Completion
                              </span>
                              <span
                                className={`text-sm font-bold ${getCompletionColor(
                                  subcategory.completion
                                )}`}
                              >
                                {subcategory.completion}%
                              </span>
                            </div>
                            <Progress
                              value={subcategory.completion}
                              className="h-2"
                            />
                          </div>

                          <div className="space-y-2">
                            <div>
                              <h4 className="text-xs font-semibold text-blue-800 mb-1">
                                Observations:
                              </h4>
                              <p className="text-xs text-blue-700 leading-relaxed">
                                {subcategory.observations}
                              </p>
                            </div>

                            {subcategory.deficiencies &&
                              subcategory.deficiencies.length > 0 && (
                                <div>
                                  <h4 className="text-xs font-semibold text-red-700 mb-1 flex items-center">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Deficiencies:
                                  </h4>
                                  <ul className="text-xs text-red-600 space-y-1">
                                    {subcategory.deficiencies.map(
                                      (
                                        deficiency: string,
                                        defIndex: number
                                      ) => (
                                        <li
                                          key={defIndex}
                                          className="flex items-start"
                                        >
                                          <span className="mr-1">•</span>
                                          <span>{deficiency}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </div>
                        </div>
                      </Card>
                    )
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
