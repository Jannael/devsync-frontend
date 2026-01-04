import type { ReactNode } from 'react'

function Page({
	className,
	children,
}: {
	className?: string
	children: ReactNode
}) {
	return (
		<div className='bg-primary w-full min-h-dvh text-txt'>
			<div className={`${className} w-full min-h-dvh max-w-7xl`}>
				{children}
			</div>
		</div>
	)
}

export default Page
