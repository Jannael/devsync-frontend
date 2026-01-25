function ButtonFloatingMenu({
	children,
	onClick,
}: {
	children: React.ReactNode
	onClick?: () => void
}) {
	return (
		<button
			className='border-error border w-full p-3 rounded-full text-error cursor-pointer'
			onClick={onClick}
			type='button'
		>
			{children}
		</button>
	)
}
export default ButtonFloatingMenu
