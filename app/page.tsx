import Image from "next/image";
import Link from 'next/link'
import VisitsChart from "./components/VisitsChart";
import { aggregateByDate } from "@/lib/aggregate";
import { getEvents } from "@/lib/queries";

export default function Home() {

  const events = getEvents()

  const locations = [
    { name: "Salmon Creek", href: "/box" },
    { name: "Irene Gossin", href: "/box" },
    { name: "Macyville Woods", href: "/box" },
    { name: "Corbett's Glen", href: "/box" },
    { name: "Kraai Preserve", href: "/box" }
  ];

  const notifications = [
    "Corrupted Data",
    "Unused box",
    "Unidentified Species",
    "Low Battery",
    "Disconnected Box"
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans">
      <main className="flex-1 max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Location Boxes */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map((location) => (
                <Link
                  key={location.name}
                  href={location.href}
                  className="flex h-[200px] w-[200px] items-center justify-center rounded-lg border border-zinc-300 bg-zinc-100 text-center font-medium text-zinc-700 hover:bg-zinc-200 hover:shadow-md transition"
                >
                  {location.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Notifications Section */}
          <div className="lg:w-80">
            <div className="bg-white border border-zinc-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-2 mb-6">
                {notifications.map((notification) => (
                  <button
                    key={notification}
                    className="w-full text-left px-3 py-2 text-sm border border-zinc-200 rounded hover:bg-zinc-50 transition"
                  >
                    {notification}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition">
                  Upload Data
                </button>
                <button className="w-full px-4 py-2 border border-zinc-300 rounded hover:bg-zinc-50 transition">
                  Add New Box
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Charts.js Section */}
        <VisitsChart data={aggregateByDate(events)} />
      </main>
    </div>
  );
}
