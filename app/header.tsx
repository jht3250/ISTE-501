'use client'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="flex flex-row items-center justify-between bg-[var(--color-blue-gray)] text-white w-full w-full p-8 md:px-20">
      <Link href="/" aria-label="Home">
        <Image
          src="/logo.png"
          alt="Genesee Land Trust Logo"
          width={128}
          height={128}
          className="cursor-pointer w-auto h-8 md:h-12"
        />
      </Link>

      <h1 className="text-2xl font-[var(--font-noto-serif)]">Kestrel Boxes</h1>

      <Link href="/profile" className="font-medium">
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
