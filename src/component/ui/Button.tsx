function Button({
	children,
	type,
	onClick,
}: {
	children: React.ReactNode
	type: 'button' | 'submit' | 'reset'
	onClick: () => void
}) {
	return (
		<button className='' onClick={onClick} type={type}>
			{children}
		</button>
	)
}

export default Button
