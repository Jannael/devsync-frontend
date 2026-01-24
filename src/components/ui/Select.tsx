import { forwardRef, type ReactNode, useState } from 'react'

type SelectProps = {
	children?: ReactNode
	name?: string
	className?: string
	value?: string
	onChange?: (value: string) => void
}
const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ children, name, className, value, onChange }, ref) => {
		const [innerValue, setInnerValue] = useState(value)
		const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
			setInnerValue(e.target.value)
			if (onChange) onChange(e.target.value)
		}
		return (
			<select
				className={`${className} border-2 border-contrast/30`}
				name={name}
				onChange={handleChange}
				ref={ref}
				value={innerValue}
			>
				{children}
			</select>
		)
	},
)

export default Select
