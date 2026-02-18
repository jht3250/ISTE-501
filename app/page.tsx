import Image from "next/image";
import Link from 'next/link'
import VisitsChart from "./components/ui/VisitsChart";
import { aggregateByDate } from "@/lib/aggregate";
import { getEvents, getAllNotifications } from "@/lib/queries";
import { ProgressBar } from "./components/ui/ProgressBar";
import SeasonalReminder from "./components/ui/Seasonal";

export default function Home() {

  const events = getEvents()

  const locations = [
    { name: "Salmon Creek", href: "/box", image: "/SalmonCreek.png" },
    { name: "Irene Gossin", href: "/box", image: "/IreneGossin.png" },
    { name: "Macyville Woods", href: "/box", image: "/MacyvilleWoods.png" },
    { name: "Corbett's Glen", href: "/box", image: "/CorbettGlen.png" },
    { name: "Kraai Preserve", href: "/box", image: "/KraaiPreserve.png" }
  ];

  const notifications = getAllNotifications()

  const notificationItems = [
    {
      id: 'corruptedData',
      label: 'Corrupted Data',
      active: notifications.corruptedData.length > 0,
      icon: '/data-alert-rounded.png',
      highlighted: true
    },
    {
      id: 'unusedBox',
      label: 'Unused box',
      active: notifications.unusedBox.length > 0,
      icon: '/clock.png',
      highlighted: false
    },
    {
      id: 'unidentifiedSpecies',
      label: 'Unidentified Species',
      active: notifications.unidentifiedSpecies.length > 0,
      icon: '/question-fill.png',
      highlighted: false
    },
    {
      id: 'lowBattery',
      label: 'Low Battery',
      active: notifications.lowBattery.length > 0,
      icon: '/battery-icon.png',
      highlighted: false
    },
    {
      id: 'disconnectedBox',
      label: 'Disconnected Box',
      active: notifications.disconnectedBox.length > 0,
      icon: '/signal.png',
      highlighted: false
    }
  ].filter(item => item.active);

  const seasonalReminder = false;
  // TODO: Implement seasonal reminder logic based on current date and season end date

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans">
      <main className="flex-1 max-w-7xl mx-auto px-8 py-15">
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
            {seasonalReminder && <SeasonalReminder />}
            <div className="bg-[#D9D9D6] border border-zinc-200 p-6 h-150 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-2 mb-6">
                {notificationItems.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full text-left px-3 py-2 text-sm border-2 border-black rounded-2xl hover:opacity-50 transition flex items-center gap-2 ${item.highlighted ? "bg-[#9E2A2B] text-white" : "bg-[#D9D9D6]"
                      }`}
                  >
                    <img src={item.icon} alt={item.label} className="w-6 h-6" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-12 flex flex-col gap-4">
              <button className="w-full px-4 py-2 bg-[#609EA0] text-white rounded hover:opacity-50 transition">
                Upload Data
              </button>
              <button className="w-full px-4 py-2 border text-black rounded hover:opacity-50 transition">
                Add New Box
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
