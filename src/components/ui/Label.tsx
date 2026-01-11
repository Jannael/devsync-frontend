import type { ReactNode } from 'react'

function Label({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<label
			className={`
				${className} flex w-full flex-col gap-3 text-sm
			`}
		>
			{children}
		</label>
	)
}

export default Label
