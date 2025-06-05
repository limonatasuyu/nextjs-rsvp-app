"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import PagesTable from "./pages-table";

export function DashboardPage() {
  const { pages } = useDashboard();

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Overview of your published pages.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Pages Table
        </h2>
        <PagesTable data={pages} />
      </div>
    </div>
  );
}
