import { useState } from 'react'

function Textarea({
	id,
	name,
	placeholder,
	value,
}: {
	id: string
	name: string
	placeholder: string
	value?: string
}) {
	const [innerValue, setInnerValue] = useState(value)
	return (
		<textarea
			className='w-full h-full min-h-32 field-sizing-content bg-main border-primary border rounded-lg p-3'
			id={id}
			name={name}
			onBlur={(e) => setInnerValue(e.target.value)}
			onChange={(e) => setInnerValue(e.target.value)}
			placeholder={placeholder}
			value={innerValue}
		/>
	)
}

export default Textarea
