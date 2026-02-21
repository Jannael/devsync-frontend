function Header({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<header
			className={`flex flex-col sm:flex-row justify-between items-center w-full relative mt-4 border-primary border py-6 sm:py-4 px-6 md:px-8 rounded-3xl sm:rounded-full gap-4 sm:gap-0 ${className}`}
		>
			{children}
		</header>
	)
}

export default Header
