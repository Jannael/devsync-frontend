import { forwardRef, type ReactNode } from 'react'

type SelectProps = {
	children?: ReactNode
	name?: string
	className?: string
}
const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ children, name, className }, ref) => {
		return (
			<select
				className={`${className} border-2 border-contrast/30`}
				name={name}
				ref={ref}
			>
				{children}
			</select>
		)
	},
)

export default Select
