import { forwardRef, useState } from 'react'

type InputTextProps = {
	required?: boolean
	name?: string
	className?: string
	placeholder?: string
	value?: string
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
	({ className, placeholder, name, required, value }, ref) => {
		const [currentValue, setCurrentValue] = useState(value)

		return (
			<input
				className={`
					${className} p-3 rounded-sm border-2 border-contrast/30 font-main text-contrast outline-none transition-border placeholder:text-contrast/60 placeholder:text-sm placeholder-shown:bg-primary focus:border-contrast/80 focus:text-contrast
				`}
				name={name}
				onChange={(e) => {
					setCurrentValue(e.target.value)
				}}
				placeholder={placeholder}
				ref={ref}
				required={required}
				type='text'
				value={currentValue}
			/>
		)
	},
)

export default InputText
