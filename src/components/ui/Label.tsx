import type { ReactNode } from 'react'

function Label({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return <label className={`${className} text-sm w-full flex flex-col gap-3`}>{children}</label>
}

export default Label
