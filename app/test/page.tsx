'use client'

import { useState } from "react"
import Modal from "../components/ErrorModal"
import { ERROR_MODALS } from "@/lib/modals/errorContent"
import DownloadComplete from "../components/Complete"
import ErrorModal from "../components/ErrorModal"

export default function Test() {
    const [open, setOpen] = useState(true)

    const modalData = ERROR_MODALS["HARDWARE"]

    return (

        <ErrorModal
            isOpen={open}
            onClose={() => setOpen(false)}
            title={modalData.title}
            message={modalData.message}
            detail={modalData.detail}
            extraInfo={modalData.extraInfo}
            // actions={modalData.actions}
        />

        // <DownloadComplete />
    )
}