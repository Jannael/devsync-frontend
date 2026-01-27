import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

function Page({
	className,
	children,
}: {
	className?: string
	children?: ReactNode
}) {
	return (
		<div
			className='
				flex
				min-h-dvh w-full
				font-main text-txt
				bg-primary
				items-center justify-center
			'
		>
			<div className={`${className} min-h-dvh w-full`}>
				{/* <Toaster position='top-center' /> */}
				{children}
			</div>
		</div>
	)
}

export default Page
