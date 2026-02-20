function Textarea({
	id,
	name,
	placeholder,
}: {
	id: string
	name: string
	placeholder: string
}) {
	return (
		<textarea
			className='w-full h-full min-h-32 field-sizing-content bg-main border-primary border rounded-lg px-3 py-4'
			id={id}
			name={name}
			placeholder={placeholder}
		/>
	)
}

export default Textarea
