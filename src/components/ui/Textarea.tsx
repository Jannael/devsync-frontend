import { forwardRef, useState } from 'react'

type TextareaProps = {
	name?: string
	className?: string
	placeholder?: string
	value?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, placeholder, name, value }, ref) => {
		const [innerValue, setInnerValue] = useState(value || '')
		return (
			<textarea
				className={`${className} resize-none border-contrast/30 border-2 rounded-xl field-sizing-content p-2`}
				name={name}
				onChange={(e) => {
					setInnerValue(e.currentTarget.value)
				}}
				placeholder={placeholder}
				ref={ref}
				value={innerValue}
			></textarea>
		)
	},
)

export default Textarea
