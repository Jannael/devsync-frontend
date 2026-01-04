function InputText({
	className,
	placeholder,
}: {
	className?: string
	placeholder?: string
}) {
	return (
		<input
			className={`
				${className}
				p-3
				border-contrast/30 border-2 rounded-sm
				transition-border
				outline-none focus:border-contrast/80 placeholder:text-sm
        placeholder:text-contrast/60
        font-main
			`}
			placeholder={placeholder}
			type='text'
		/>
	)
}

export default InputText
