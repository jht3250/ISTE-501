type ProgressBarProps = {
    value: number
    //   color?: string
}

export function ProgressBar({ value }: ProgressBarProps) {
    const totalGB = 64
    const percentUsed = Math.min(100, Math.max(0, (value / totalGB) * 100))

    return (
        <div className="w-full h-4 rounded-full bg-[#E6E1DB] overflow-hidden">
            <div
                className={`h-full rounded-full bg-[var(--color-blue-gray)]`}
                style={{ width: `${percentUsed}%` }}
            />
        </div>
    )
}
