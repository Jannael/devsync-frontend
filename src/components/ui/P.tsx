import type { ReactNode } from 'react'

function P({
	children,
	className,
}: {
	children?: ReactNode
	className?: string
}) {
	return <p className={`${className} text-balance text-md`}>{children}</p>
}

export default P
