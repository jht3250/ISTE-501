'use client'
import { ReactNode } from 'react'

type ModalProps = {
    isOpen: boolean
    onClose: () => void

    title: string
    message: string
    detail?: string
    extraInfo?: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, message, detail, extraInfo }: ModalProps) {
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
                </div>
            </div>
        </div >
    )
}
