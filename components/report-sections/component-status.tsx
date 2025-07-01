import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Circle, AlertTriangle } from "lucide-react"

interface ComponentStatusProps {
  data: any
}

export function ComponentStatus({ data }: ComponentStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-orange-400" />
      case "pending":
        return <Circle className="h-5 w-5 text-gray-400" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return { text: "Completed", className: "bg-green-500/20 text-green-200 border-green-400/30" }
      case "in-progress":
        return { text: "In Progress", className: "bg-orange-500/20 text-orange-200 border-orange-400/30" }
      case "pending":
        return { text: "Pending", className: "bg-gray-500/20 text-gray-200 border-gray-400/30" }
      default:
        return { text: "Unknown", className: "bg-gray-500/20 text-gray-200 border-gray-400/30" }
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return { text: "High Priority", className: "bg-red-500/20 text-red-200 border-red-400/30" }
      case "medium":
        return { text: "Medium", className: "bg-blue-500/20 text-blue-200 border-blue-400/30" }
      case "low":
        return { text: "Low Priority", className: "bg-green-500/20 text-green-200 border-green-400/30" }
      default:
        return { text: "Normal", className: "bg-gray-500/20 text-gray-200 border-gray-400/30" }
    }
  }

  const groupedComponents = data.componentStatus.reduce((acc: any, component: any) => {
    if (!acc[component.status]) {
      acc[component.status] = []
    }
    acc[component.status].push(component)
    return acc
  }, {})

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Component Status Overview</h1>
          <p className="text-white/70 text-lg">Detailed breakdown of all project components and their current status</p>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl border-green-400/30">
            <div className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-400 mb-2">{groupedComponents.completed?.length || 0}</div>
              <div className="text-green-200">Completed Components</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-xl border-orange-400/30">
            <div className="p-6 text-center">
              <Clock className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {groupedComponents["in-progress"]?.length || 0}
              </div>
              <div className="text-orange-200">In Progress</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur-xl border-gray-400/30">
            <div className="p-6 text-center">
              <Circle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-400 mb-2">{groupedComponents.pending?.length || 0}</div>
              <div className="text-gray-200">Pending Start</div>
            </div>
          </Card>
        </div>

        {/* Component Grid */}
        <div className="space-y-8">
          {Object.entries(groupedComponents).map(([status, components]: [string, any]) => (
            <div key={status}>
              <h2 className="text-2xl font-semibold text-white mb-4 capitalize">
                {status.replace("-", " ")} Components
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {components.map((component: any, index: number) => {
                  const statusBadge = getStatusBadge(component.status)
                  const priorityBadge = getPriorityBadge(component.priority)

                  return (
                    <Card
                      key={index}
                      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:scale-105 transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(component.status)}
                            <h3 className="text-lg font-semibold text-white">{component.name}</h3>
                          </div>
                          {component.priority === "high" && component.status !== "completed" && (
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                          )}
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm">Progress:</span>
                            <span className="text-white font-semibold">{component.progress}%</span>
                          </div>
                          <Progress value={component.progress} className="h-2 bg-white/10" />
                        </div>

                        <div className="flex justify-between items-center">
                          <Badge className={statusBadge.className}>{statusBadge.text}</Badge>
                          <Badge className={priorityBadge.className}>{priorityBadge.text}</Badge>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Critical Items Alert */}
        {data.componentStatus.some((c: any) => c.priority === "high" && c.status !== "completed") && (
          <Card className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-xl border-red-400/30 mt-8">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Critical Items Requiring Attention</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.componentStatus
                  .filter((c: any) => c.priority === "high" && c.status !== "completed")
                  .map((component: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                      <span className="text-white font-medium">{component.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-red-200 text-sm">{component.progress}% complete</span>
                        <Badge className="bg-red-500/30 text-red-200 border-red-400/50">
                          {component.status === "pending" ? "Not Started" : "In Progress"}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
