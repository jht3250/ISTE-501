'use client'

import { useRouter } from 'next/navigation'
import { processUpload } from '@/app/actions/upload'

// Sample CSV data 
const SD_CARD_DATA = `serial_number,timestamp,species,image_url,occupancy,temperature
DEV-001,${Math.floor(Date.now() / 1000) - 3600},Kestrel,/images/kestrel/upload1.jpg,1,23.5
DEV-001,${Math.floor(Date.now() / 1000) - 7200},Bat,/images/bat/upload1.jpg,0,19.2
DEV-002,${Math.floor(Date.now() / 1000) - 1800},Other,/images/other/upload1.jpg,1,21.0`

export default function ProcessingPage() {
    const router = useRouter()

    // useEffect(() => {
    //     processUpload(SD_CARD_DATA).then(() => {
    //         router.push('/upload/complete')
    //     })
    // }, [router])

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-8">Loading...</h2>
                <div className="mb-8">
                    <div className="w-26 h-26 mx-auto border-6 border-gray-300 border-t-[#609EA0] rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-600">We are processing data to assemble your dashboard. Please be patient.</p>
            </div>
        </div>
    )
}
