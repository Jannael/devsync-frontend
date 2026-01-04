import type { ReactNode } from 'react'

function Button({
	children,
	className,
}: {
	children?: ReactNode
	className?: string
}) {
	return (
		<button
			className={`
				${className} border-contrast/50 border-2 py-3 px-6 rounded-full cursor-pointer
				font-main
			`}
			type='submit'
		>
			{children}
		</button>
	)
}

export default Button
