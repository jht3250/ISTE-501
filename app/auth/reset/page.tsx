'use client'
import { useState } from 'react'

export default function Reset() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const [hasRequestedReset, setHasRequestedReset] = useState(false)

    const handleRequestReset = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ email })
        // something something to send reset email
        setHasRequestedReset(true)
    }

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        console.log({ password })
        // something something to actually reset password
    }

    return (
        <div className="flex justify-center mt-12">
            <div className="w-full rounded-lg bg-[#D9D9D6] p-8 shadow-lg">

                {!hasRequestedReset ? (
                    /* ================= EMAIL FORM ================= */
                    <form onSubmit={handleRequestReset} className="max-w-sm mx-auto p-4 gap-8 flex flex-col">

                        <div className="flex flex-col">
                            <h1 className="text-2xl text-center">
                                Reset Password
                            </h1>
                            <p className="text-sm text-gray-600">Enter your email and we will send you a link to reset your password.</p>

                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="bg-white rounded border border-gray-600 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded bg-[#609EA0] text-white py-2 font-semibold hover:bg-blue-700 transition"
                        >
                            Send Email
                        </button>

                    </form>
                ) : (
                    /* ================= PASSWORD FORM ================= */
                    <form onSubmit={handleResetPassword} className="max-w-sm mx-auto p-4 gap-8 flex flex-col">
                        <h1 className="text-2xl text-center">
                            Reset Password
                        </h1>

                        {/* Password */}
                        <div className="flex flex-col">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="bg-white rounded border border-gray-600 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                required
                            />
                            <p className="text-sm text-gray-600">Your password must be at least 8 characters and include one number and one symbol.</p>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col">
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="bg-white rounded border border-gray-600 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded bg-[#609EA0] text-white py-2 font-semibold hover:bg-blue-700 transition"
                        >
                            Reset Password
                        </button>

                    </form>
                )
                }
            </div>
        </div>
    )
}