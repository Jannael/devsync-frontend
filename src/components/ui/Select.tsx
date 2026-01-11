import { forwardRef, type ReactNode, useState } from 'react'

type SelectProps = {
	children?: ReactNode
	name?: string
	className?: string
	value?: string
}
const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ children, name, className, value }, ref) => {
		const [innerValue, setInnerValue] = useState(value)
		return (
			<select
				className={`${className} border-2 border-contrast/30`}
				name={name}
				onChange={(e) => setInnerValue(e.currentTarget.value)}
				ref={ref}
				value={innerValue}
			>
				{children}
			</select>
		)
	},
)

export default Select
