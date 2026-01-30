'use client'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="flex flex-row items-center justify-between bg-[var(--color-blue-gray)] text-white w-full p-8 px-20">
      <Link href="/" aria-label="Home">
        <Image
          src="/logo.png" 
          alt="Genesee Land Trust Logo"
          width={128}
          height={128}
          className="cursor-pointer"
        />
      </Link>

      <h1>Kestrel Boxes</h1>

      <Link href="/" className="font-medium">
        <Image
          src="/profile.png" 
          alt="Profile Picture Logo"
          width={36}
          height={36}
          className="cursor-pointer"
        />
      </Link>
    </header>
  )
}
