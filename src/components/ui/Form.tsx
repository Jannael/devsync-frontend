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
				${className} shadow-contrast shadow-sm rounded-sm p-8 flex flex-col justify-center items-center gap-6
			`}
			onSubmit={onSubmit}
		>
			{children}
		</form>
	)
}

export default Form
