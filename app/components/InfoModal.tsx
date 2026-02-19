'use client'

type ModalProps = {
    isOpen: boolean
    onClose: () => void

    title: string
    message: string
    button: string
}

export default function InfoModal({ isOpen, onClose, title, message, button }: ModalProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-sm rounded-lg bg-white p-6"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="space-y-6 text-center">
                    <p className="text-lg">{title}</p>
                    <p className="text-md">{message}</p>

                    <button
                        onClick={() => console.log("Cancelling...")} // replace with logic
                        className="w-full rounded px-4 py-2 bg-[#609EA0] text-white hover:opacity-50 transition"
                    >
                        {button}
                    </button>
                </div>
            </div>
        </div >
    )
}
