'use client'

import { deleteBox } from '@/app/actions/delete'

export default function DeleteBoxButton({ boxId, boxName }: { boxId: number; boxName: string }) {
    async function handleDelete(e: React.MouseEvent) {
        e.preventDefault()  // don't navigate to the box
        e.stopPropagation()
        if (!confirm(`Delete "${boxName}"? This will permanently remove the box and all its events.`)) return
        await deleteBox(boxId)
    }

    return (
        <button
            onClick={handleDelete}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer"
            title="Delete box"
        >
            ✕
        </button>
    )
}
