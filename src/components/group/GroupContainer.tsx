import type { ReactNode } from 'react'

export function GroupContainer({ children }: { children: ReactNode }) {
	return (
		<div
			className='
				flex flex-wrap
				w-full
				p-4
				gap-6 justify-evenly items-start
			'
		>
			{children}
		</div>
	)
}

export default GroupContainer
