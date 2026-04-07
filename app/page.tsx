import Image from "next/image";
import Link from 'next/link'
import VisitsChart from "./components/ui/VisitsChart";
import { aggregateByDate } from "@/lib/aggregate";
import { getEvents, getAllNotifications, getBoxes } from "@/lib/queries";
import { ProgressBar } from "./components/ui/ProgressBar";
import SeasonalReminder from "./components/ui/Seasonal";
import AddBoxModalWrapper from "./components/AddBox";
import HomeClient from "./components/HomeClient";

export default function Home() {

  const events = getEvents()
  const locations = getBoxes()
  const visitCounts = aggregateByDate(events)

  const notifications = getAllNotifications()

  const notificationItems = [
    {
      id: 'corruptedData',
      label: 'Corrupted Data',
      active: notifications.corruptedData.length > 0,
      icon: '/data-alert-rounded.png',
      highlighted: true,
      href: '/corrupted'
    },
    {
      id: 'unusedBox',
      label: 'Unused box',
      active: notifications.unusedBox.length > 0,
      icon: '/clock.png',
      highlighted: false,
      href: `/box/${encodeURIComponent(notifications.unusedBox[0]?.box_name ?? '')}`
    },
    {
      id: 'unidentifiedSpecies',
      label: 'Unidentified Species',
      active: notifications.unidentifiedSpecies.length > 0,
      icon: '/question-fill.png',
      highlighted: false,
      href: `/box/${encodeURIComponent(notifications.unidentifiedSpecies[0]?.box_name ?? '')}?event=${notifications.unidentifiedSpecies[0]?.event_id ?? ''}`
    },
    {
      id: 'lowBattery',
      label: 'Low Battery',
      active: notifications.lowBattery.length > 0,
      icon: '/battery-icon.png',
      highlighted: false,
      href: `/box/${encodeURIComponent(notifications.lowBattery[0]?.box_name ?? '')}`
    },
    {
      id: 'disconnectedBox',
      label: 'Disconnected Box',
      active: notifications.disconnectedBox.length > 0,
      icon: '/signal.png',
      highlighted: false,
      href: `/box/${encodeURIComponent(notifications.disconnectedBox[0]?.box_name ?? '')}`
    }
  ].filter(item => item.active);
  // ];

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
                    src={location.image_url ?? '/placeholder-box.png'}
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
                  {notifications.disconnectedBox.some(n => n.box_name === location.name) && (
                    <img src="/signal.png" alt="Disconnected" className="absolute bottom-2 right-2 w-8 h-8" />
                  )}
                  {notifications.lowBattery.some(n => n.box_name === location.name) && (
                    <img src="/battery-icon.png" alt="Low Battery" className="absolute bottom-2 right-2 w-8 h-8" />
                  )}
                  {notifications.unusedBox.some(n => n.box_name === location.name) && (
                    <img src="/clock.png" alt="Unused" className="absolute bottom-2 right-2 w-8 h-8" />
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
                {notificationItems.length === 0 ? (
                  <p className="text-md text-center text-zinc-500 italic px-1 ">No current notifications</p>
                ) : (
                  notificationItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`w-full text-left px-3 py-2 text-sm border-2 border-black rounded-2xl cursor-pointer hover:opacity-50 transition flex items-center gap-2 ${item.highlighted ? "bg-[#9E2A2B] text-white" : "bg-[#D9D9D6]"
                        }`}
                    >
                      <img src={item.icon} alt={item.label} className="w-6 h-6" />
                      {item.label}
                    </Link>
                  ))
                )}
              </div>
            </div>
            <div className="mt-12 flex flex-col gap-4">
              <Link href="/upload">
                <button className="w-full px-4 py-2 bg-[#609EA0] text-white rounded cursor-pointer hover:opacity-50 transition">
                  Upload Data
                </button>
              </Link>
              <AddBoxModalWrapper />
            </div>
          </div>
        </div>

        {/* Charts.js Section */}
        {/* <VisitsChart data={aggregateByDate(events)} /> */}

        <HomeClient events={events} visitCounts={visitCounts} />
      
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
