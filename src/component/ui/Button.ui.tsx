function Button({
	children,
	onClick,
	type,
}: {
	children: React.ReactNode
	onClick?: () => void
	type: 'button' | 'submit' | 'reset'
}) {
	return (
		<button
			className='text-contrast py-2 rounded-full px-3 cursor-pointer bg-primary mt-5 hover:bg-shade hover:text-accent hover:border-accent hover:border-2 transition-all duration-300'
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	)
}

export default Button
