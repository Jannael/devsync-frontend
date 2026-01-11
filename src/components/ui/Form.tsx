import type { FormEventHandler, ReactNode } from 'react'

function Form({
	children,
	className,
	onSubmit,
}: {
	children?: ReactNode
	className?: string
	onSubmit?: FormEventHandler<HTMLFormElement>
}) {
	return (
		<form
			action=''
			className={`
				${className} flex flex-col items-center justify-center gap-6 rounded-sm p-8 shadow-contrast shadow-sm
			`}
			onSubmit={onSubmit}
		>
			{children}
		</form>
	)
}

export default Form
