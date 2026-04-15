'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const hideProfile = ['/auth', '/upload'].some(path => pathname.startsWith(path))

  return (
    <header className="relative flex flex-row items-center justify-between bg-[var(--color-blue-gray)] text-white w-full p-8 md:px-20">
      <Link href="/" aria-label="Home">
        <Image
          src="/logo-landtrust.png"
          alt="Genesee Land Trust Logo"
          width={128}
          height={128}
          className="cursor-pointer w-auto h-8 md:h-12"
        />
      </Link>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-[var(--font-noto-serif)] pointer-events-none">
        Kestrel Boxes
      </h1>

      {!hideProfile ? (
        <Link href="/profile" className="font-medium">
          <Image
            src="/profile.png"
            alt="Profile Picture Logo"
            width={36}
            height={36}
            className="cursor-pointer"
          />
        </Link>
      ) : (
        <div className="w-24" />
      )}
    </header>
  )
}
