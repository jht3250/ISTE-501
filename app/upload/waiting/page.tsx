'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WaitingPage() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [serialNumber, setSerialNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleUpload(e: React.FormEvent) {
        e.preventDefault()
        const file = fileInputRef.current?.files?.[0]
        if (!file || !serialNumber.trim()) return

        setLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('serial_number', serialNumber.trim())

        try {
            const res = await fetch('/api/upload-zip', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()

            if (!res.ok) {
                setError(data.error ?? 'Upload failed')
                setLoading(false)
                return
            }

            router.push('/upload/complete')
        } catch {
            setError('Network error — please try again.')
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-128px)] px-4 py-8">
            <div className="w-full max-w-2xl bg-[#D9D9D6] p-4 sm:p-6 md:p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">Upload Data</h2>

                    <div className="flex justify-center">
                        <img
                            src="/upload.png"
                            alt="Upload icon"
                            className="w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-32 lg:w-48 lg:h-32 object-contain pb-4"
                        />
                    </div>

                    {loading ? (
                        <div className="mb-6">
                            <div className="w-12 h-12 mx-auto border-4 border-gray-300 border-t-[#609EA0] rounded-full animate-spin mb-4" />
                            <p className="text-gray-600 text-sm sm:text-base">Processing images, please wait…</p>
                        </div>
                    ) : (
                        <>
                            {/* <div className="mb-4">
                                <p className="text-base sm:text-lg font-medium text-gray-700 mb-6">Waiting for connection…</p>
                            </div> */}

                            <div className="border-b border-gray-400 pb-6">
                                <p className="text-md text-gray-600 mb-4">Upload a ZIP file:</p>
                                <form onSubmit={handleUpload} className="flex flex-col gap-3 items-center">
                                    <input
                                        type="text"
                                        placeholder="Device serial number"
                                        value={serialNumber}
                                        onChange={e => setSerialNumber(e.target.value)}
                                        className="w-full max-w-xs px-3 py-2 border border-gray-400 rounded text-sm bg-white"
                                        required
                                    />
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".zip"
                                        className="w-full max-w-xs text-sm text-gray-600 px-3 py-2 border border-gray-400 rounded bg-white cursor-pointer"
                                        required
                                    />
                                    {error && (
                                        <p className="text-red-600 text-sm">{error}</p>
                                    )}
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-[#609EA0] text-white rounded hover:bg-[#4a8082] transition text-sm sm:text-base"
                                    >
                                        Upload ZIP
                                    </button>
                                </form>
                            </div>
                        </>
                    )}

                    <div className="flex flex-col sm:flex-row justify-center items-center p-4">
                        <div className="max-w-sm">
                            <p className="text-md text-gray-600 mb-4">To Gather Data from System:</p>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Stand as close to the box as you can. Wait for your phone to find the correct hardware connection. Download the data once it has come through before moving away from the box. Upload the data here. This may take a moment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="w-full max-w-2xl mt-4 text-right">
                <a href="/upload/hardware-error" className="text-black-600 underline hover:text-blue-600 text-sm sm:text-base">
                    I'm having issues
                </a>
            </div> */}
        </div>
    )
}
