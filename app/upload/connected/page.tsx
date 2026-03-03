'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ConnectedPage() {
    const router = useRouter()

    // useEffect(() => {
    //     // Simulate hardware connection detection after 5 seconds
    //     const timer = setTimeout(() => {
    //         router.push('/upload/connected')
    //     }, 5000)

    //     return () => clearTimeout(timer)
    // }, [router])

    return (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-128px)]">
            <div className="w-[800px] bg-[#D9D9D6] p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Upload Data</h2>

                    <div className="flex justify-center items-center mb-5">
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

                    <div className="mb-1 ">
                        <p className="text-lg font-medium text-gray-700">Connected!</p>
                    </div>

                    <div className="mt-2">
                        <button className="bg-[#609EA0] hover:bg-[#508090] text-white font-medium py-4 px-18 rounded-lg transition-colors">
                            Upload Data
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
