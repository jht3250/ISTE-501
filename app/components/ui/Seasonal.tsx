"use client"

import { useState } from "react"

export default function SeasonReminder() {

    const [showSeasonReminder, setShowSeasonReminder] = useState(false)

    return (
        <>
            <div className="fixed right-0 top-30 z-40 pr-12 rounded-l-lg bg-[#1E5F3F] ">
                <button
                    onClick={() => setShowSeasonReminder(true)}
                    className="flex items-center gap-2 px-4 py-2 text-white hover:opacity-80 transition"
                >
                    <img src="/info-icon.png" alt="Info Icon" className="w-5 h-5" />
                    Season Ending
                </button>
            </div>
        </>
    )
}
