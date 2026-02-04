import Image from "next/image";
import Link from 'next/link'
import VisitsChart from "./components/VisitsChart";
import { aggregateByDate } from "@/lib/aggregate";
import { getEvents } from "@/lib/queries";

export default function Home() {

  const events = getEvents()

  const locations = [
    { name: "Salmon Creek", href: "/box", image: "/SalmonCreek.png" },
    { name: "Irene Gossin", href: "/box", image: "/IreneGossin.png" },
    { name: "Macyville Woods", href: "/box", image: "/MacyvilleWoods.png" },
    { name: "Corbett's Glen", href: "/box", image: "/CorbettGlen.png" },
    { name: "Kraai Preserve", href: "/box", image: "/KraaiPreserve.png" }
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
                  className="relative w-full aspect-square border-2 border-black bg-zinc-100 hover:bg-zinc-200 hover:shadow-md transition overflow-hidden"
                >
                  <img
                    src={location.image}
                    alt={location.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-black font-medium text-lg font-[var(--font-noto-serif)] drop-shadow-lg">{location.name}</span>
                    <span className="text-black text-lg font-[var(--font-noto-serif)] drop-shadow-lg">00.000.000</span>
                  </div>
                  {location.name === "Salmon Creek" && (
                    <img
                      src="/signal.png"
                      alt="Signal"
                      className="absolute bottom-2 right-2 w-8 h-8"
                    />
                  )}
                  {location.name === "Macyville Woods" && (
                    <img
                      src="/battery-icon.png"
                      alt="Battery"
                      className="absolute bottom-2 right-2 w-8 h-8"
                    />
                  )}
                  {location.name === "Kraai Preserve" && (
                    <img
                      src="/clock.png"
                      alt="Clock"
                      className="absolute bottom-2 right-2 w-8 h-8"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Notifications Section */}
          <div className="lg:w-80">
            <div className="bg-[#D9D9D6] border border-zinc-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-2 mb-6">
                {notifications.map((notification) => (
                  <button
                    key={notification}
                    className={`w-full text-left px-3 py-2 text-sm border border-zinc-200 rounded hover:bg-zinc-50 transition flex items-center gap-2 ${
                      notification === "Corrupted Data" ? "bg-[#9E2A2B] text-white" : "bg-white"
                    }`}
                  >
                    {notification === "Corrupted Data" && (
                      <img
                        src="/data-alert-rounded.png"
                        alt="Alert"
                        className="w-4 h-4"
                      />
                    )}
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
