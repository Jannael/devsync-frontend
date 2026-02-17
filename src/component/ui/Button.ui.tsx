function Button({
	children,
	onClick,
	type,
	block,
	className,
}: {
	children: React.ReactNode
	onClick?: () => void
	type: 'button' | 'submit' | 'reset'
	block: boolean
	className?: string
}) {
	return (
		<button
			className={`text-txt py-2 rounded-full px-3 cursor-pointer bg-primary border-2 border-transparent hover:bg-shade hover:text-accent hover:border-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
			disabled={block}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	)
}

export default Button
