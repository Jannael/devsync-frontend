function Button({
	children,
	onClick,
	type,
	block,
}: {
	children: React.ReactNode
	onClick?: () => void
	type: 'button' | 'submit' | 'reset'
	block: boolean
}) {
	return (
		<button
			className='text-contrast py-2 rounded-full px-3 cursor-pointer bg-primary mt-5 hover:bg-shade hover:text-accent hover:border-accent hover:border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
			disabled={block}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	)
}

export default Button
