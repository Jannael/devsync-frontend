import { useState } from 'react'

function Input({
	name,
	placeholder,
	type,
	value,
	onChange,
	id,
}: {
	name: string
	placeholder: string
	type: string
	value?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	id: string
}) {
	const [innerVal, setInnerVal] = useState(value || '')

	return (
		<input
			className='border border-contrast/50 p-2 rounded-full focus:border-accent focus:outline-none transition-all duration-300 px-4'
			id={id}
			name={name}
			onChange={(e) => {
				setInnerVal(e.target.value)
				onChange?.(e)
			}}
			placeholder={placeholder}
			type={type}
			value={innerVal}
		/>
	)
}

export default Input
