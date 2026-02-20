import { forwardRef, useState } from 'react'

const Select = forwardRef<
	HTMLSelectElement,
	{
		children: React.ReactNode
		id: string
		onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
		value: string
	}
>(({ children, id, onChange, value }, ref) => {
	const [innerValue, setInnerValue] = useState(value)
	return (
		<select
			className='bg-main border-primary border-2 rounded-xl px-4 py-2'
			id={id}
			name={id}
			onChange={(e) => {
				setInnerValue(e.target.value)
				onChange(e)
			}}
			ref={ref}
			value={innerValue}
		>
			{children}
		</select>
	)
})

export default Select
