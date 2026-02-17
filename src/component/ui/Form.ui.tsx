function Form({
	onSubmit,
	children,
}: {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	children: React.ReactNode
}) {
	return (
		<form
			className='flex flex-col gap-5 w-full max-w-md justify-around py-10 md:py-15 px-6 md:px-10 rounded-xl border-primary border bg-main'
			onSubmit={onSubmit}
		>
			{children}
		</form>
	)
}

export default Form
