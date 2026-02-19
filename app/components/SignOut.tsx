
export default function SignOutModal({ onConfirm, onCancel, }: { onConfirm: () => void; onCancel: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40">
            <div className="bg-white rounded-md px-10 py-8 shadow-lg flex flex-col items-center gap-8">

                <h2 className="text-2xl font-serif font-semibold text-black">
                    Would you like to sign out?
                </h2>

                <div className="flex gap-6">
                    <button
                        onClick={onConfirm}
                        className="px-8 py-3 bg-red-800 text-white font-semibold rounded-sm hover:bg-red-900 transition"
                    >
                        Sign Out
                    </button>

                    <button
                        onClick={onCancel}
                        className="px-8 py-3 border border-black text-black font-semibold rounded-sm hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    )
}
