export default function WaitingPage() {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
            <div className="w-[800px] bg-[#D9D9D6] p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-6">Upload Data</h2>
                    
                    <div className="flex justify-center items-center mb-20">
                        <div className="text-left justify-center">
                             <p className="text-gray-600 leading-relaxed mb-20 mr-45">
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
                    
                    <div className="mb-6">
                        <p className="text-lg font-medium text-gray-700">Waiting for connection...</p>
                    </div>

                </div>
            </div>

            <div className="mt-8 text-right">
                <a href="#" className="text-black-600 underline text-sm hover:text-blue-600">
                    I'm having issues
                </a>
            </div>
        </div>
    )
}
