'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ConnectedPage() {
    const router = useRouter()

    useEffect(() => {
        // Auto-advance to processing after 2 seconds
        const timer = setTimeout(() => {
            router.push('/upload/processing')
        }, 2000)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
            <div className="w-[600px] rounded-lg bg-[#D9D9D6] p-8 shadow-lg">
                <div className="text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Connected!</h2>
                    <p className="text-gray-600">SD card detected successfully.</p>
                    <p className="text-sm text-gray-500 mt-2">Preparing to process your data...</p>
                </div>
            </div>
        </div>
    )
}
