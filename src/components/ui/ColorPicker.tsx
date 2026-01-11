function ColorPicker({
	className,
	name,
}: {
	className?: string
	name?: string
}) {
	return (
		<input
			className={`${className} h-12 w-full cursor-pointer`}
			name={name}
			type='color'
		/>
	)
}

export default ColorPicker
