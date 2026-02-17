'use client'

import { useState } from "react"
import Modal from "../components/ErrorModal"
import { ERROR_MODALS } from "@/lib/modals/errorContent"
import DownloadComplete from "../components/Complete"
import ErrorModal from "../components/ErrorModal"

export default function Test() {
    const [open, setOpen] = useState(true)

    const modalData = ERROR_MODALS["SEASONAL"]

    return (

        <ErrorModal
            isOpen={open}
            onClose={() => setOpen(false)}
            title={modalData.title}
            message={modalData.message}
            extraInfo={modalData.extraInfo}
            variant={modalData.variant}
            // actions={modalData.actions}
        />

        // <DownloadComplete />
    )
}