function ColorPicker({
	className,
	name,
}: {
	className?: string
	name?: string
}) {
	return (
		<input
			className={`${className} w-full cursor-pointer h-12`}
			name={name}
			type='color'
		/>
	)
}

export default ColorPicker
