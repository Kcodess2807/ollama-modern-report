import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, CloudSun } from "lucide-react";
import Image from "next/image";

interface CoverPageProps {
  data: any;
}

export function CoverPage({ data }: CoverPageProps) {
  return (
    <div
      id="cover-page"
      className="min-h-screen flex items-center justify-center p-8"
    >
      <div className="max-w-4xl w-full">
        <Card className="bg-white/90 backdrop-blur-xl border-blue-200 shadow-2xl mb-6">
          <div className="p-8 text-center flex justify-center items-center">
            <Image
              src="/logo.png"
              alt="Construction Site"
              width={200}
              height={100}
              className="mx-auto"
            />

            <h1 className="text-5xl font-bold text-blue-900 mb-4">
              Construction Progress Report
            </h1>
          </div>
        </Card>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-lg font-semibold text-blue-900">
                  Project Name
                </h3>
              </div>
              <p className="text-2xl font-bold text-blue-800">
                {data.siteInfo.projectName}
              </p>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-lg font-semibold text-blue-900">
                  Date
                </h3>
              </div>
              <p className="text-2xl font-bold text-blue-800">{data.siteInfo.date}</p>
            </div>
          </Card>


          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-lg font-semibold text-blue-900">Client</h3>
              </div>
              <p className="text-2xl font-bold text-blue-800">{data.siteInfo.client}</p>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-lg font-semibold text-blue-900">Project Type</h3>
              </div>
              <p className="text-2xl font-bold text-blue-800">{data.siteInfo.projectType}</p>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-lg font-semibold text-blue-900">Main Consultant</h3>
              </div>
              <p className="text-2xl font-bold text-blue-800">{data.siteInfo.mainConsultant}</p>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-lg font-semibold text-blue-900">Main Contractor</h3>
              </div>
              <p className="text-2xl font-bold text-blue-800">{data.siteInfo.mainContractor}</p>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-lg font-semibold text-blue-900">Interior Designer</h3>
              </div>
              <p className="text-2xl font-bold text-blue-800">{data.siteInfo.interiorDesigner}</p>
            </div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-lg font-semibold text-blue-900">Other Consultants</h3>
              </div>
              <p className="text-2xl font-bold text-blue-800">{data.siteInfo.otherConsultants}</p>
            </div>
          </Card>
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-12">
          <p className="text-blue-600 text-sm">
            Generated on {new Date().toLocaleDateString()} • Confidential
            Document
          </p>
        </div> */}
      </div>
    </div>
  );
}
