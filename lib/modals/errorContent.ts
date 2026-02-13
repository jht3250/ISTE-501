import { ReactNode } from "react"

export type ErrorModalKey =
  | "DATABASE"
  | "CONNECTION"
  | "HARDWARE"
  | "HARDWARE_CONNECTION"
  | "UPLOAD"
  | "CORRUPTED_IMAGE"

export type ModalAction = {
  label: string
  onClick: () => void
}

export type ErrorModalContent = {
  title: string
  message: string
  detail?: string
  extraInfo?: string
  actions?: ModalAction[]
  variant?: "error" | "warning"
}

export const ERROR_MODALS: Record<ErrorModalKey, ErrorModalContent> = {
  DATABASE: {
    title: "Database Error",
    message: "There appears to be an issue with the database.",
    detail: "database / storage",
    extraInfo: "The database is out of storage space. Please upgrade your database storage plan.",
    variant: "error",
  },

  CONNECTION: {
    title: "Connection Error",
    message: "There appears to be an issue with the box connection.",
    detail: "disconnected box · geocoordinate",
    extraInfo: "The listed box is not connected to the system. Would you like to upload the data anyway?",
    actions: [
      {
        label: "Upload Anyway",
        onClick: () => console.log("Uploading anyway..."),
      },
    ],
    variant: "warning",
  },

  HARDWARE: {
    title: "Hardware Error",
    message: "There appears to be an issue with your hardware.",
    detail: "Camera Module",
    extraInfo: "Please check the hardware of your box to ensure proper connection and try again.",
    variant: "error",
  },

  HARDWARE_CONNECTION: {
    title: "Hardware Connection Error",
    message: "We're having issues connecting to the hardware.",
    detail: "more information/solution",
    variant: "error",
  },

  UPLOAD: {
    title: "Upload Error",
    message: "There appears to be an issue with uploading your data.",
    extraInfo: "Please try uploading the data again.",
    variant: "warning",
  },

  CORRUPTED_IMAGE: {
    title: "Corrupted Image",
    message: "The data for this image has been corrupted.",
    extraInfo: "It is recommended that you delete this data to prevent further issues.",
    actions: [
      {
        label: "Delete Image Data",
        onClick: () => console.log("Deleting image..."),
      },
    ],
    variant: "warning",
  },
} 
