import type { ReactNode } from 'react'

function Title({
	children,
	className,
}: {
	children?: ReactNode
	className?: string
}) {
	return <h1 className={`${className} text-3xl`}>{children}</h1>
}

export default Title
