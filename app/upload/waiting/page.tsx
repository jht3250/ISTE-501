'use client'

import { useRouter } from 'next/navigation'

export default function WaitingPage() {
    const router = useRouter()

    // useEffect(() => {
    //     // Simulate hardware connection detection after 5 seconds
    //     const timer = setTimeout(() => {
    //         router.push('/upload/connected')
    //     }, 5000)

    //     return () => clearTimeout(timer)
    // }, [router])

    return (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-128px)] px-4">
            <div className="w-full max-w-2xl bg-[#D9D9D6] p-4 sm:p-6 md:p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">Upload Data</h2>

                    <div className="flex flex-col sm:flex-row justify-center items-center mb-3 sm:mb-4">
                        <div className="text-left max-w-sm">
                             <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                Stand as close to the box as you can. Have this page open and wait for your phone to find the correct hardware connection. Wait until the data has come through before moving away from the box. Lastly, upload the data. This may take a moment.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src="/upload.png"
                                alt="Upload icon"
                                className="w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-32 lg:w-96 lg:h-64 object-contain"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-base sm:text-lg font-medium text-gray-700">Waiting for you to upload data...</p>
                    </div>
                    <div className="mt-4">
                        <button className="bg-[#609EA0] hover:bg-[#508090] text-white font-medium py-3 sm:py-4 px-6 sm:px-8 lg:px-12 rounded-lg transition-colors text-sm sm:text-base">
                            Upload Data
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-2xl mt-4 text-right">
                <a href="/upload/hardware-error" className="text-black-600 underline hover:text-blue-600 text-sm sm:text-base" >
                    I'm having issues
                </a>
            </div>

        </div>
    )
}
