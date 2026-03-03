import Link from "next/link";
import Image from "next/image";
import { SPECIES_COLORS } from "@/lib/speciesColors";
import { getCorruptedEvents } from "@/lib/queries";
import { deleteEvent, deleteAllCorrupted } from "@/app/actions/delete";

export default function CorruptedPage() {
    const events = getCorruptedEvents()

    return (
        <main className="m-10 mx-20">
            {/* Header section */}
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 group"
                >
                    <span className="text-xl">&lt;</span>
                    <span className='hover:underline text-xl font-[var(--font-noto-serif)]'>Corrupted Data</span>
                </Link>

                <form action={deleteAllCorrupted}>
                    <button
                        type="submit"
                        className="flex rounded-md bg-[#9E2A2B] px-4 py-2 text-sm font-medium text-white hover:bg-red-900 cursor-pointer items-center gap-2"
                    >
                        <Image src="/trash-icon.png" alt="Trash Icon" width={24} height={24} />
                        Delete All Corrupted Data
                    </button>
                </form>
            </div>

            {/* Table section */}
            <div className="overflow-x-auto rounded-md border mt-12">
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-[#CBC4BC]">
                        <tr>
                            <th className="border px-3 py-2 w-16 text-left font-[var(--font-noto-serif)] font-bold">Delete Data</th>
                            <th className="border px-3 py-2 text-left font-[var(--font-noto-serif)] font-bold">Date</th>
                            <th className="border px-3 py-2 text-left font-[var(--font-noto-serif)] font-bold">Timestamp</th>
                            <th className="border px-3 py-2 text-left font-[var(--font-noto-serif)] font-bold">Animal Type</th>
                            <th className="border px-3 py-2 text-left font-[var(--font-noto-serif)] font-bold">Box Location</th>
                            <th className="border px-3 py-2 text-left font-[var(--font-noto-serif)] font-bold">Image</th>
                        </tr>
                    </thead>

                    <tbody>
                        {events.map((event, index) => {
                            const date = new Date(event.timestamp * 1000)
                            const validDate = event.timestamp > 0 && !isNaN(date.getTime())
                            const validSpecies = Boolean(SPECIES_COLORS[event.common_name])
                            const validBox =
                                event.box_name &&
                                !event.box_name.includes("?") &&
                                !event.box_name.toLowerCase().includes("invalid") &&
                                !event.box_name.toLowerCase().includes("disconnected") &&
                                !event.box_name.toLowerCase().includes("not found")
                            const validImage = Boolean(event.image_url)
                            const corruptedStyle = "text-red-600 font-semibold"

                            return (
                                <tr
                                    key={event.event_id}
                                    className={index % 2 === 0 ? "bg-[#f2f2f1]" : "bg-[#e0dbd7]"}
                                >
                                    {/* Delete button */}
                                    <td className="border px-3 py-2">
                                        <form action={deleteEvent}>
                                            <input type="hidden" name="eventId" value={event.event_id} />
                                            <button type="submit" className="cursor-pointer hover:opacity-70">
                                                <img src="/delete-icon.png" className="w-6 h-6 mx-auto" />
                                            </button>
                                        </form>
                                    </td>

                                    {/* Date */}
                                    <td className="border px-3 py-2">
                                        {validDate ? (
                                            date.toLocaleDateString()
                                        ) : (
                                            <span className={corruptedStyle}>CORRUPTED!</span>
                                        )}
                                    </td>

                                    {/* Time */}
                                    <td className="border px-3 py-2">
                                        {validDate ? (
                                            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                        ) : (
                                            <span className={corruptedStyle}>CORRUPTED!</span>
                                        )}
                                    </td>

                                    {/* Species */}
                                    <td className="border px-3 py-2">
                                        {validSpecies ? (
                                            <span
                                                className={`rounded-full px-4 py-0.5 text-xs whitespace-nowrap block min-w-[80px] text-center ${SPECIES_COLORS[event.common_name]}`}
                                            >
                                                {event.common_name}
                                            </span>
                                        ) : (
                                            <span className={corruptedStyle}>CORRUPTED!</span>
                                        )}
                                    </td>

                                    {/* Box */}
                                    <td className="border px-3 py-2">
                                        {validBox ? (
                                            event.box_name
                                        ) : (
                                            <span className={corruptedStyle}>CORRUPTED!</span>
                                        )}
                                    </td>

                                    {/* Image */}
                                    <td className="border px-3 py-2 text-center">
                                        {validImage ? (
                                            <button className="hover:opacity-70 cursor-pointer">
                                                <img src="/image-icon.png" className="w-6 h-6 mx-auto" />
                                            </button>
                                        ) : (
                                            <span className={corruptedStyle}>CORRUPTED!</span>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}

                        {/* Fill remaining rows */}
                        {[...Array(Math.max(0, 5 - events.length))].map((_, index) => {
                            const rowIndex = events.length + index
                            return (
                                <tr key={`empty-${index}`} className={rowIndex % 2 === 0 ? 'bg-[#f2f2f1]' : 'bg-[#e0dbd7]'}>
                                    <td className="border px-3 py-2 h-[40px]"></td>
                                    <td className="border px-3 py-2 h-[40px]"></td>
                                    <td className="border px-3 py-2 h-[40px]"></td>
                                    <td className="border px-3 py-2 h-[40px]"></td>
                                    <td className="border px-3 py-2 h-[40px]"></td>
                                    <td className="border px-3 py-2 h-[40px]"></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </main>
    )
}
