'use client'
import { ModalAction } from '@/lib/modals/errorContent'

type ModalProps = {
    isOpen: boolean
    onClose: () => void

    title: string
    message: string
    detail?: string
    extraInfo?: string
    actions?: ModalAction[]
}

export default function ErrorModal({ isOpen, onClose, title, message, detail, extraInfo, actions }: ModalProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40"
            onClick={onClose}
        >
            {/* Header Section */}
            <div
                className="relative w-full max-w-sm rounded-lg bg-white p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute left-6 top-6 text-xl font-bold cursor-pointer"
                >
                    X
                </button>

                {/* Info Section */}
                {/* Red header */}
                <div className="my-8 rounded bg-red-800 px-4 py-3 text-center text-white text-xl font-[var(--font-noto-serif)]">
                    {title}
                </div>

                <div className="space-y-6 text-center">
                    <p className="text-lg">{message}</p>

                    {detail && (
                        <div className="text-md font-[var(--font-noto-serif)]">
                            {/* [] */} {detail}
                        </div>
                    )}

                    {/* {extraInfo && (
                        <div className="text-sm text-gray-700">
                            {extraInfo}
                        </div>
                    )} */}
                    {extraInfo && (
                        <div className="text-sm">
                            {extraInfo}
                        </div>
                    )}

                    {/* Actions buttons */}
                    {actions && actions.length > 0 && (
                        <div className="mt-4 flex justify-center gap-4">
                            {actions.map((action, idx) => (
                                <button
                                    key={idx}
                                    onClick={action.onClick}
                                    className="rounded border border-white px-4 py-2 text-white hover:bg-gray-100 hover:text-black transition"
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}
