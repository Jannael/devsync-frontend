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
				${className}
				p-3
				border-contrast/30 border-2 rounded-sm
				transition-border
				outline-none focus:border-contrast/80 placeholder:text-sm
				focus:text-contrast
        placeholder:text-contrast/60
        font-main
				placeholder-shown:bg-primary
				text-contrast
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
