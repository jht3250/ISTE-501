'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { requestPasswordReset, resetPassword } from '@/app/actions/auth'

export default function Reset() {

    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [hasRequestedReset, setHasRequestedReset] = useState(false)
    const router = useRouter()

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await requestPasswordReset(email)
        if (result.error) {
            setError(result.error)
            setLoading(false)
            return
        }

        setLoading(false)
        setHasRequestedReset(true)
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await resetPassword(email, token, password, confirmPassword)
        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push('/auth')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
            <div className="w-96 rounded-lg bg-[#D9D9D6] p-8 shadow-lg">

                {!hasRequestedReset ? (
                    /* ================= EMAIL FORM ================= */
                    <form onSubmit={handleRequestReset} className="max-w-sm mx-auto p-4 gap-8 flex flex-col">

                        <div className="flex flex-col">
                            <h1 className="text-2xl text-center">
                                Reset Password
                            </h1>
                            <p className="text-sm text-gray-600">Enter your email and we will send you a code to reset your password.</p>
                        </div>

                        {error && (
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        )}

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
                            disabled={loading}
                            className="w-full rounded bg-[#609EA0] text-white py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send Code'}
                        </button>

                    </form>
                ) : (
                    /* ================= CODE + PASSWORD FORM ================= */
                    <form onSubmit={handleResetPassword} className="max-w-sm mx-auto p-4 gap-8 flex flex-col">
                        <h1 className="text-2xl text-center">
                            Reset Password
                        </h1>

                        <p className="text-sm text-gray-600 text-center">
                            A reset code was sent to <strong>{email}</strong>. Enter it below.
                        </p>

                        {error && (
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        )}

                        {/* Reset Code */}
                        <div className="flex flex-col">
                            <input
                                type="text"
                                id="token"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="Enter 6-digit code"
                                maxLength={6}
                                className="bg-white rounded border border-gray-600 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 text-center tracking-widest text-lg"
                                required
                            />
                        </div>

                        {/* New Password */}
                        <div className="flex flex-col">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New Password"
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
                                placeholder="Confirm New Password"
                                className="bg-white rounded border border-gray-600 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded bg-[#609EA0] text-white py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>

                    </form>
                )}
            </div>
        </div>
    )
}
