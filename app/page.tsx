import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 bg-white sm:items-start">
        <Link
          href="/box"
          className="flex h-[200px] w-[200px] items-center justify-center rounded-lg border border-zinc-300 bg-zinc-100 text-center font-medium text-zinc-700 hover:bg-zinc-200 hover:shadow-md transition"
        >
          Salmon Creek
        </Link>

      </main>
    </div>
  );
}
