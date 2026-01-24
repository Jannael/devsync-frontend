import type { ReactNode } from 'react'

function Modal({
	children,
	onOverLayClick,
}: {
	children: ReactNode
	onOverLayClick?: () => void
}) {
	return (
		<>
			<button
				className='fixed w-full min-h-dvh bg-contrast/5 top-0 left-0 backdrop-blur-sm'
				onClick={onOverLayClick}
				type='button'
			></button>
			<div className='w-96 bg-primary fixed '>{children}</div>
		</>
	)
}

export default Modal
