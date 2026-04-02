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
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-128px)]">
            <div className="w-200 bg-[#D9D9D6] p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Upload Data</h2>

                    <div className="flex justify-center items-center mb-10">
                        <div className="text-left justify-center">
                            <p className="text-gray-600 leading-relaxed mr-45">
                                Stand as close to the box as you can. Have this page open and wait for your phone to find the correct hardware connection. Wait until the data has come through before moving away from the box. This may take a moment.
                            </p>
                        </div>
                        <div className="flex justify-center m-4">
                            <img
                                src="/upload.png"
                                alt="Upload icon"
                                className="w-120 h-40"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="mb-6">
                            <div className="w-12 h-12 mx-auto border-4 border-gray-300 border-t-[#609EA0] rounded-full animate-spin mb-4" />
                            <p className="text-gray-600">Processing images, please wait…</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <p className="text-lg font-medium text-gray-700 mb-6">Waiting for connection…</p>
                            </div>

                            <div className="border-t border-gray-400 pt-6">
                                <p className="text-sm text-gray-600 mb-4">Or upload a ZIP file manually:</p>
                                <form onSubmit={handleUpload} className="flex flex-col gap-3 items-center">
                                    <input
                                        type="text"
                                        placeholder="Device serial number"
                                        value={serialNumber}
                                        onChange={e => setSerialNumber(e.target.value)}
                                        className="w-72 px-3 py-2 border border-gray-400 rounded text-sm bg-white"
                                        required
                                    />
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".zip"
                                        className="w-72 text-sm text-gray-600"
                                        required
                                    />
                                    {error && (
                                        <p className="text-red-600 text-sm">{error}</p>
                                    )}
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-[#609EA0] text-white rounded hover:bg-[#4a8082] transition text-sm"
                                    >
                                        Upload ZIP
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="w-200 mt-4 text-right">
                <a href="/upload/hardware-error" className="text-black-600 underline hover:text-blue-600">
                    I'm having issues
                </a>
            </div>
        </div>
    )
}
