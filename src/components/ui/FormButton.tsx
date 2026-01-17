import type { MouseEventHandler, ReactNode } from 'react'

function Button({
	children,
	className,
	onClick,
	block,
}: {
	children?: ReactNode
	className?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
	block: boolean
}) {
	return (
		<button
			className={`
				${className} w-full cursor-pointer rounded-full border-2 border-contrast/50 px-6 py-3
			`}
			disabled={block}
			onClick={onClick}
			type='submit'
		>
			{children}
		</button>
	)
}

export default Button
