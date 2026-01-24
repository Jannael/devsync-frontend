import type { ReactNode } from 'react'

function FloatingMenu({
	children,
	onOverlayClick,
}: {
	children: ReactNode
	onOverlayClick?: () => void
}) {
	return (
		<>
			<button
				className='w-full min-h-dvh fixed left-0 top-0'
				onClick={onOverlayClick}
				type='button'
			></button>
			<div className=''>{children}</div>
		</>
	)
}

export default FloatingMenu
