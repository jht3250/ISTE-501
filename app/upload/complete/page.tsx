'use client'

export default function CompletePage() {
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
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Upload Complete!</h2>
                    <p className="text-gray-600">Your data has been processed successfully.</p>
                    
                    <div className="mt-6 space-y-3">
                        <button 
                            onClick={() => window.location.href = '/'}
                            className="w-full px-6 py-3 bg-[#609EA0] text-white rounded hover:bg-blue-700 transition"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
