import type { ReactNode } from 'react'

export function PeopleSection({ children }: { children?: ReactNode }) {
	return <section className='w-9/10 m-auto'>{children}</section>
}

export function PeopleHeader({ children }: { children: ReactNode }) {
	return (
		<header
			className='
				flex
				pb-5
				border-b-2
				items-center justify-between
			'
		>
			{children}
		</header>
	)
}
