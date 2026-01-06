import type { MouseEventHandler, ReactNode } from 'react'

function Button({
	children,
	className,
	onClick,
}: {
	children?: ReactNode
	className?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
}) {
	return (
		<button
			className={`
				${className} border-contrast/50 border-2 py-3 px-6 rounded-full cursor-pointer
				w-full
			`}
			onClick={onClick}
			type='submit'
		>
			{children}
		</button>
	)
}

export default Button
