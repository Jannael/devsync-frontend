import { forwardRef } from 'react'

type InputTextProps = {
	required?: boolean
	name?: string
	className?: string
	placeholder?: string
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
	({ className, placeholder, name, required }, ref) => {
		return (
			<input
				className={`
					${className}p-3 rounded-sm border-2 border-contrast/30 font-main text-contrast outline-none transition-border placeholder:text-contrast/60 placeholder:text-sm placeholder-shown:bg-primary focus:border-contrast/80 focus:text-contrast
				`}
				name={name}
				placeholder={placeholder}
				ref={ref}
				required={required}
				type='text'
			/>
		)
	},
)

export default InputText
