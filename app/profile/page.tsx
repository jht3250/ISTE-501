import Link from "next/link";

export default function Profile() {
    return (
        <main className="mt-10 mx-20">
            {/* Back Section */}
            <div className="flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 group"
                >
                    <span className="text-xl">&lt;</span>
                    <span className='hover:underline text-xl font-[var(--font-noto-serif)]'>Profile</span>
                </Link>

            </div>
            <div className="flex justify-center mt-12">
                <div className="w-full max-w-xl rounded-lg bg-[#D9D9D6] p-8 shadow-lg">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <h2 className="text-xl font-bold">Account</h2>

                        <button className="flex items-center gap-1 text-sm font-medium hover:underline">
                            Sign Out
                            <span className="text-lg">↪</span>
                        </button>
                    </div>
                    {/* Account Info */}
                    <div className="space-y-3 mb-8 text-sm">
                        <div className="flex gap-2">
                            <span className="font-medium">Email:</span>
                            <span>first.last@genesseeandtrust.org</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="font-medium">Password:</span>
                            <span>••••••••••</span>
                            <button className="text-xs opacity-70 hover:opacity-100">👁</button>
                        </div>

                        <button className="text-sm text-blue-600 hover:underline">
                            Change Password
                        </button>
                    </div>

                    {/* MFA Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-3">
                            Multi-Factor Authentication
                        </h3>

                        <div className="space-y-2 text-sm">
                            <div className="font-medium">Duo Security</div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="mfa" className="accent-black" />
                                Text code
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="mfa"
                                    defaultChecked
                                    className="accent-black"
                                />
                                Duo Push
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}