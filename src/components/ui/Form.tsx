import type { ReactNode } from 'react'

function Form({
	children,
	className,
}: {
	children?: ReactNode
	className?: string
}) {
	return <form action='' className={`${className} shadow-contrast shadow-sm rounded-sm p-8`}>
    {children}
    </form>
}

export default Form
