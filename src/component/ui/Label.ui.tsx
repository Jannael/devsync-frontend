function Label({
	htmlFor,
	children,
}: {
	htmlFor: string
	children: React.ReactNode
}) {
	return (
		<label className='' htmlFor={htmlFor}>
			{children}
		</label>
	)
}

export default Label
