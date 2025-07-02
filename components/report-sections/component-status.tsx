import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Circle } from "lucide-react"

interface ComponentStatusProps {
  data: any
}

export function ComponentStatus({ data }: ComponentStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-blue-600" />
      case "inProgress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "pending":
        return <Circle className="h-5 w-5 text-blue-400" />
      default:
        return <Circle className="h-5 w-5 text-blue-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return { text: "Completed", className: "bg-blue-100 text-blue-800 border-blue-300" }
      case "inProgress":
        return { text: "In Progress", className: "bg-blue-50 text-blue-700 border-blue-200" }
      case "pending":
        return { text: "Pending", className: "bg-blue-50 text-blue-600 border-blue-200" }
      default:
        return { text: "Unknown", className: "bg-blue-50 text-blue-600 border-blue-200" }
    }
  }

  const groupedComponents = data.componentDetails.reduce((acc: any, component: any) => {
    if (!acc[component.status]) {
      acc[component.status] = []
    }
    acc[component.status].push(component)
    return acc
  }, {})

  return (
    <div id="component-status" className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Component Status Overview</h1>
          <p className="text-blue-700 text-lg">Detailed breakdown of all project components and their current status</p>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-xl border-blue-300">
            <div className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">{data.components.completed}</div>
              <div className="text-blue-700">Completed Components</div>
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-xl border-blue-300">
            <div className="p-6 text-center">
              <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-500 mb-2">{data.components.inProgress}</div>
              <div className="text-blue-700">In Progress</div>
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-xl border-blue-300">
            <div className="p-6 text-center">
              <Circle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-400 mb-2">{data.components.pending}</div>
              <div className="text-blue-700">Pending Start</div>
            </div>
          </Card>
        </div>

        {/* Component Grid */}
        <div className="space-y-8">
          {Object.entries(groupedComponents).map(([status, components]: [string, any]) => (
            <div key={status}>
              <h2 className="text-2xl font-semibold text-blue-900 mb-4 capitalize">
                {status === "inProgress" ? "In Progress" : status} Components
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {components.map((component: any, index: number) => {
                  const statusBadge = getStatusBadge(component.status)

                  return (
                    <Card
                      key={index}
                      className="bg-white/90 backdrop-blur-xl border-blue-200 hover:scale-105 transition-all duration-300 hover:border-blue-300"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(component.status)}
                            <h3 className="text-lg font-semibold text-blue-900">{component.name}</h3>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Badge className={statusBadge.className}>{statusBadge.text}</Badge>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
