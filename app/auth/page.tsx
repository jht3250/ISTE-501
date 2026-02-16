// Authentication landing page to log in or sign up for an account.
'use client'

import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ email, password })
        // something something
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
            <div className="w-96 rounded-lg bg-[#D9D9D6] p-8 shadow-lg">

                <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 gap-8 flex flex-col">
                    <h1 className="text-2xl text-center">
                        Login
                    </h1>
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
                    <div className="flex flex-col" >
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="bg-white rounded border border-gray-600 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="text-sm">Remember Me</label>
                        </div>
                        <Link href="/auth/reset" className="text-sm text-black-600 underline hover:text-blue-600">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded bg-[#609EA0] text-white py-2 font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                    {/* Link to login */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">

                            <Link href="/auth/create-account" className="text-black-600 underline hover:text-blue-600 hover:underline">
                                Create a New Account
                            </Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    )
}