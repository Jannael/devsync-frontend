import { useState } from "react"

function Select({
	children,
	id,
	onChange,
	value,
}: {
	children: React.ReactNode
	id: string
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	value: string
}) {
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
			value={innerValue}
		>
			{children}
		</select>
	)
}
export default Select
