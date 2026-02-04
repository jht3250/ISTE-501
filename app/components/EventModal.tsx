'use client'

import { EventRow } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'

export default function EventModal({
    event,
    onClose,
    onSave,
}: {
    event: EventRow
    onClose: () => void
    onSave?: (updatedEvent: Partial<EventRow>) => void
}) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedData, setEditedData] = useState({
        common_name: event.common_name,
        box_name: event.box_name || 'Salmon Creek',
        timestamp: event.timestamp,
        image_url: event.image_url || '',
    })
    const date = new Date(editedData.timestamp * 1000)

    const handleSave = () => {
        if (onSave) {
            onSave({
                event_id: event.event_id,
                ...editedData,
            })
        }
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedData({
            common_name: event.common_name,
            box_name: event.box_name || 'Salmon Creek',
            timestamp: event.timestamp,
            image_url: event.image_url || '',
        })
        setIsEditing(false)
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onClose} //closes on outside click
        >
            <div 
                className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}>

                <button
                    onClick={onClose}
                    className="absolute left-4 top-4 cursor-pointer"
                >
                    X
                </button>

                <div className="mb-6 text-xl font-[var(--font-noto-serif)] flex items-center justify-center gap-2">
                    {isEditing ? (
                        <select
                            value={editedData.common_name}
                            onChange={(e) => setEditedData({ ...editedData, common_name: e.target.value })}
                            className="border rounded px-2 py-1 text-base"
                        >
                            <option value="Kestrel">Kestrel</option>
                            <option value="Bat">Bat</option>
                            <option value="Other">Other</option>
                        </select>
                    ) : (
                        editedData.common_name
                    )}
                    {' '}
                    <Image
                        src="/pen.png"
                        alt="pencil icon"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => setIsEditing(!isEditing)}
                    />
                </div>

                <div className="space-y-2 text-sm">
                    <div>
                        <strong>Box Location:</strong>{' '}
                        {editedData.box_name}
                    </div>

                    <div>
                        <strong>Timestamp:</strong>{' '}
                        {isEditing ? (
                            <input
                                type="datetime-local"
                                value={new Date(editedData.timestamp * 1000).toISOString().slice(0, 16)}
                                onChange={(e) => {
                                    const newTimestamp = Math.floor(new Date(e.target.value).getTime() / 1000)
                                    setEditedData({ ...editedData, timestamp: newTimestamp })
                                }}
                                className="border rounded px-2 py-1 ml-2"
                            />
                        ) : (
                            date.toLocaleString()
                        )}
                    </div>

                     {isEditing && (
                        <div>
                            <strong>Image URL:</strong>{' '}
                            <input
                                type="text"
                                value={editedData.image_url}
                                onChange={(e) => setEditedData({ ...editedData, image_url: e.target.value })}
                                className="border rounded px-2 py-1 ml-2 w-full mt-1"
                                placeholder="/images/kestrel/k1.jpg"
                            />
                        </div>
                    )}
                </div>

                <div className="my-6 flex h-48 items-center justify-center bg-[#dedede] text-sm text-gray-600">
                    {editedData.image_url ? (
                        <img 
                            src={editedData.image_url} 
                            alt={editedData.common_name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-400">No image available</span>
                    )}
                </div>

                {isEditing ? (
                    <div className="flex gap-2">
                        <button 
                            className="flex-1 rounded-md bg-[#6BA4A6] py-3 text-white font-medium cursor-pointer hover:bg-[#5a8b8d] transition-colors"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                        <button 
                            className="flex-1 rounded-md bg-gray-400 py-3 text-white font-medium cursor-pointer hover:bg-gray-500 transition-colors"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (

                <button className="w-full rounded-md bg-[#6BA4A6] py-3 text-white font-medium cursor-pointer"
                    onClick={() => {
                         if (editedData.image_url) {
                            window.open(editedData.image_url, '_blank')
                        }
                    }}
                    disabled={!editedData.image_url}
                >
                    Download Image
                </button>
                )}
            </div>
        </div>
    )
}
