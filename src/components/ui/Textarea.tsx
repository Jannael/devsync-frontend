import { forwardRef } from 'react'

type TextareaProps = {
	name?: string
	className?: string
	placeholder?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, placeholder, name }, ref) => {
		return (
			<textarea
				className={`${className} resize-none border-contrast/30 border-2 rounded-xl field-sizing-content p-2`}
				name={name}
				placeholder={placeholder}
				ref={ref}
			></textarea>
		)
	},
)

export default Textarea
