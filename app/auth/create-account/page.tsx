'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createAccount } from '@/app/actions/auth'

export default function CreateAccount() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await createAccount(email, password, confirmPassword)
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

                <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 gap-8 flex flex-col">
                    <h1 className="text-2xl text-center">
                        Create Account
                    </h1>

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
                        disabled={loading}
                        className="w-full rounded bg-[#609EA0] text-white py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                </form>
            </div>
        </div>
    )
}
