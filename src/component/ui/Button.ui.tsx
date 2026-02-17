function Button({
	children,
	onClick,
	type,
	block,
	className,
	variant,
}: {
	children: React.ReactNode
	onClick?: () => void
	type: 'button' | 'submit' | 'reset'
	block: boolean
	className?: string
	variant?: 'default' | 'destructive'
}) {
	return (
		<button
			className={`text-white py-2 rounded-full px-3 cursor-pointer 
				border-2 border-transparent
				${variant === 'destructive' ? 'bg-warning' : 'bg-primary'} 
				${variant === 'destructive' ? 'hover:text-warning' : 'hover:text-accent'} 
				${variant === 'destructive' ? 'hover:border-warning' : 'hover:border-accent'} 
				${variant === 'destructive' ? 'hover:bg-main' : 'hover:bg-shade'} 
				transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
			disabled={block}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	)
}

export default Button
