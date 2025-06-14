"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-100 h-auto min-h-screen w-64 shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Menu</h2>
      <ul className="flex flex-col gap-3">
        <li>
          <Link
            href="/events"
            className={cn(
              "block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-black transition-colors",
              pathname === "/events" ? "bg-gray-400 text-black" : ""
            )}
          >
            🗓️ Events
          </Link>
        </li>
        <li>
          <Link
            href="/create"
            className={cn(
              "block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-black transition-colors",
              pathname === "/create" ? "bg-gray-400 text-black" : ""
            )}
          >
            ➕ Create Event
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className={cn(
              "block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-black transition-colors",
              pathname === "/settings" ? "bg-gray-400 text-black" : ""
            )}
          >
            ⚙️ Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
