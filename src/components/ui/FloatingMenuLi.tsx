function FloatingMenuLi({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<li className={`${className} flex hover:bg-contrast/30 hover:text-contrast border-b w-full`}>
			{children}
		</li>
	)
}
export default FloatingMenuLi
