function Select({
	children,
	id,
	onChange,
}: {
	children: React.ReactNode
	id: string
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
	return (
		<select
			className='bg-main border-primary border-2 rounded-xl px-4 py-2'
			id={id}
			name={id}
			onChange={onChange}
		>
			{children}
		</select>
	)
}
export default Select
