function Form({
	onSubmit,
	children,
	className,
	padding = true,
}: {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	children: React.ReactNode
	className?: string
	padding?: boolean
}) {
	return (
		<form
			className={`flex flex-col gap-5 w-full justify-around 
				${padding ? 'py-10 md:py-15 px-6 md:px-10' : ''} rounded-xl border-primary border bg-main ${className}`}
			onSubmit={onSubmit}
		>
			{children}
		</form>
	)
}

export default Form
