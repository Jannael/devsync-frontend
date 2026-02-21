function Loading({ fullPage = true }: { fullPage?: boolean }) {
	return (
		<div
			className={`${
				fullPage ? 'fixed inset-0 z-99999' : 'w-full h-full'
			} flex justify-center items-center bg-main`}
		>
			<div className='animate-spin rounded-full h-12 w-12 border-4 border-shade border-t-primary' />
		</div>
	)
}

export default Loading
