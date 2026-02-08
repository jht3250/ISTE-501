import Image from "next/image";
import Link from 'next/link'
import VisitsChart from "./components/VisitsChart";
import { aggregateByDate } from "@/lib/aggregate";
import { getEvents } from "@/lib/queries";
import { ProgressBar } from "./components/ui/ProgressBar";

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
                  href={`/box/${encodeURIComponent(location.name)}`}
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
            <div className="bg-[#D9D9D6] border border-zinc-200 p-6 h-150 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-2 mb-6">
                {notifications.map((notification) => (
                  <button
                    key={notification}
                    className={`w-full text-left px-3 py-2 text-sm border-2 border-black rounded-2xl hover:bg-zinc-50 transition flex items-center gap-2 ${notification === "Corrupted Data" ? "bg-[#9E2A2B] text-white" : "bg-[#D9D9D6]"
                      }`}
                  >
                    {notification === "Corrupted Data" && (
                      <img
                        src="/data-alert-rounded.png"
                        alt="Alert"
                        className="w-6 h-6"
                      />
                    )}
                    {notification === "Unused box" && (
                      <img
                        src="/clock.png"
                        alt="Clock"
                        className="w-6 h-6"
                      />
                    )}
                    {notification === "Unidentified Species" && (
                      <img
                        src="/question-fill.png"
                        alt="Question"
                        className="w-6 h-6"
                      />
                    )}
                    {notification === "Low Battery" && (
                      <img
                        src="/battery-icon.png"
                        alt="Battery"
                        className="w-6 h-6"
                      />
                    )}
                    {notification === "Disconnected Box" && (
                      <img
                        src="/signal.png"
                        alt="Signal"
                        className="w-6 h-6"
                      />
                    )}
                    {notification}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-12">
              <button className="w-full px-4 py-2 bg-[#609EA0] text-white rounded hover:bg-opacity-90 transition">
                Upload Data
              </button>
            </div>
          </div>
        </div>

        {/* Charts.js Section */}
        <VisitsChart data={aggregateByDate(events)} />

        {/* Storage Progress Section */}
        <div className="mt-12 px-12 flex justify-around gap-8">
          <div className="flex flex-col gap-2 w-full">
            <span className="text-md text-muted-foreground">Image Storage</span>
            <ProgressBar value={30} />
            <span className="text-sm text-muted-foreground text-center">30GB / 64GB</span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="text-md text-muted-foreground">General Storage</span>
            <ProgressBar value={22} />
            <span className="text-sm text-muted-foreground text-center">22GB / 64GB</span>
          </div>
        </div>
      </main>
    </div>
  );
}
