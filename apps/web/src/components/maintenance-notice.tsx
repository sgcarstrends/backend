"use client";

import { AlertTriangle, Clock } from "lucide-react";
import useMaintenance from "@/hooks/use-maintenance";

export const MaintenanceNotice = () => {
  useMaintenance();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-lg border border-gray-100 bg-white p-8 text-center shadow-xs">
          <div className="mb-6 flex justify-center">
            <AlertTriangle className="size-16 text-blue-600" />
          </div>
          <h1 className="mb-4 text-3xl font-semibold text-gray-800">
            System Maintenance
          </h1>
          <div className="mb-8 space-y-4">
            <p className="text-gray-600">
              We are currently performing scheduled maintenance to improve your
              experience. Our services will be back online shortly.
            </p>
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Clock className="h-5 w-5" />
              <span>Estimated downtime: 2 hours</span>
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              For urgent inquiries, please contact our support team at:
              <br />
              <a
                href="mailto:support@sgcarstrends.com"
                className="text-blue-600 hover:text-blue-700"
              >
                support@sgcarstrends.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
