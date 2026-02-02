'use client'

import { EventRow } from '@/lib/types'
import Image from 'next/image'

export default function EventModal({
    event,
    onClose,
}: {
    event: EventRow
    onClose: () => void
}) {
    const date = new Date(event.timestamp * 1000)

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onClose} //closes on outside click
        >
            <div 
                className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}>

                <button
                    onClick={onClose}
                    className="absolute left-4 top-4 cursor-pointer"
                >
                    X
                </button>

                <div className="mb-6 text-xl font-[var(--font-noto-serif)] flex items-center justify-center gap-2">
                    {event.common_name}{' '}
                    <Image
                        src="/pen.png"
                        alt="pencil icon"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                </div>

                <div className="space-y-2 text-sm">
                    <p>
                        <strong>Box Location:</strong> Salmon Creek
                    </p>
                    <p>
                        <strong>Timestamp:</strong>{' '}
                        {date.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                </div>

                <div className="my-6 flex h-48 items-center justify-center bg-[#dedede] text-sm text-gray-600">
                    &lt;img&gt;
                </div>

                <button className="w-full rounded-md bg-[#6BA4A6] py-3 text-white font-medium cursor-pointer">
                    Download Image
                </button>
            </div>
        </div>
    )
}
