'use client'
import Link from 'next/link'

export function Header() {
  return (
    <header className="m-12 flex flex-row items-center justify-around">
      <Link href="/" className="font-medium text-black dark:text-white">
        Home
      </Link>

      <h1>Kestrel Box</h1>

      <Link href="/" className="font-medium text-black dark:text-white">
        Profile
      </Link>
    </header>
  )
}
