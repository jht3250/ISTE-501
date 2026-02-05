'use client'

import { useState } from "react"
import Modal from "../components/Modal"

export default function Test() {
    const [open, setOpen] = useState(true)
    return (

        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            title="Hardware Error"
            message="There appears to be an issue with your hardware."
            detail="Camera Module"
            extraInfo={
                <>
                    <p>
                        Please check the hardware of your box to ensure proper connection
                        and try again.
                    </p>
                </>
            }
        />
    )
}