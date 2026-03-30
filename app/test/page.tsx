'use client'

import { useState } from "react"
import Modal from "../components/ErrorModal"
import { ERROR_MODALS } from "@/lib/modals/errorContent"
import DownloadComplete from "../components/Complete"
import ErrorModal from "../components/ErrorModal"
import InfoModal from "../components/InfoModal"

export default function Test() {
    const [open, setOpen] = useState(true)

    const modalData = ERROR_MODALS["SEASONAL"]

    return (

        // <ErrorModal
        //     isOpen={open}
        //     onClose={() => setOpen(false)}
        //     title={modalData.title}
        //     message={modalData.message}
        //     extraInfo={modalData.extraInfo}
        //     variant={modalData.variant}
        //     // actions={modalData.actions}
        // />

        <InfoModal
            isOpen={open}
            onClose={() => setOpen(false)}
            title={"Scanning System for Errors..."}
            message={"We are checking the system for possible errors, please wait"}
            button={"Cancel"}
        />

        // <DownloadComplete />
    )
}