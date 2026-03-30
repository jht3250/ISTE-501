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
        <div className="flex justify-center items-center min-h-[calc(100vh-128px)] px-4">
            <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Loading...</h2>
                <div className="mb-6 sm:mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto border-4 sm:border-6 border-gray-300 border-t-[#609EA0] rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">We are processing data to assemble your dashboard. Please be patient.</p>
            </div>
        </div>
    )
}
