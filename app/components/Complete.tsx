import Image from "next/image"

export default function DownloadComplete({ onClose }: { onClose: () => void }) {

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40" onClick={onClose}>
            <div className="relative w-full max-w-sm rounded-lg bg-white p-6 flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute left-4 top-4 cursor-pointer">X</button>
                <div className="px-4 py-3 text-center text-xl font-[var(--font-noto-serif)]">
                    Download Complete!
                </div>
                <Image src="/check-icon.png" alt="Check Icon" width={128} height={128} />
            </div>
        </div>
    )
}