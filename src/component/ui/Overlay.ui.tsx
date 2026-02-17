function Overlay({
	children,
	setShow,
}: {
	children: React.ReactNode
	setShow: (show: boolean) => void
}) {
	return (
		// biome-ignore lint: it the common practice
		<div
			className='fixed top-0 left-0 right-0 bottom-0 z-99999 w-full min-h-dvh flex justify-center items-center backdrop-blur-sm bg-black/20'
			onClick={() => setShow(false)}
		>
			{/* biome-ignore lint: false positive */}
			<div onClick={(e) => e.stopPropagation()}>{children}</div>
		</div>
	)
}

export default Overlay
