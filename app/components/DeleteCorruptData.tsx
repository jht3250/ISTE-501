
export default function DeleteCorruptDataModal({ onConfirm, onCancel, count }: { onConfirm: () => void; onCancel: () => void; count: number }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40">
            <div className="bg-white rounded-md px-10 py-8 shadow-lg flex flex-col items-center gap-8">

                <h2 className="text-2xl font-serif font-semibold text-black text-center">
                    You are about to delete {count} of corrupted data points.
                </h2>

                <p className="text-lg text-black text-center">
                    Are you sure you want to delete all of this data?
                </p>

                <div className="flex gap-6">
                    <button
                        onClick={onConfirm}
                        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-sm cursor-pointer hover:bg-red-700 transition"
                    >
                        Delete Corrupted Data
                    </button>

                    <button
                        onClick={onCancel}
                        className="px-6 py-3 border border-black text-black font-semibold rounded-sm cursor-pointer hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    )
}
