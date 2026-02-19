'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { processUpload } from '@/app/actions/upload'

// Sample CSV data 
const SD_CARD_DATA = `serial_number,timestamp,species,image_url,occupancy,temperature
DEV-001,${Math.floor(Date.now() / 1000) - 3600},Kestrel,/images/kestrel/upload1.jpg,1,23.5
DEV-001,${Math.floor(Date.now() / 1000) - 7200},Bat,/images/bat/upload1.jpg,0,19.2
DEV-002,${Math.floor(Date.now() / 1000) - 1800},Other,/images/other/upload1.jpg,1,21.0`

export default function ProcessingPage() {
    const router = useRouter()

    useEffect(() => {
        processUpload(SD_CARD_DATA).then(() => {
            router.push('/upload/complete')
        })
    }, [router])

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
            <div className="w-[600px] rounded-lg bg-[#D9D9D6] p-8 shadow-lg">
                <div className="text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 mx-auto border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Loading...</h2>
                    <p className="text-gray-600">We are processing data to assemble your dashboard.</p>
                    <p className="text-sm text-gray-500 mt-2">Please be patient. This may take a few moments.</p>

                    <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
