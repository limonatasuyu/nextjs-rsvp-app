"use client";

import { useEvents } from "@/components/page/events/hooks/use-events";
import { EventsTable } from "./events-table";

export function EventsPage() {
  const { events, loading, refetch } = useEvents();

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600">Overview of your published events.</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Events Table</h2>
        <EventsTable data={events} loading={loading} refetchData={refetch} />
      </div>
    </div>
  );
}
