import { type ReactNode, useRef, useState } from 'react'
import { Edit } from '../../icons'
import Button from '../ui/Button'
import InputText from '../ui/InputText'

function GroupInfoField({
	children,
	field,
	fieldValue,
	onSave,
	placeholder
}: {
	children?: ReactNode
	onSave?: (value: string | undefined) => void
	field?: string
	fieldValue?: string
	placeholder?: string
}) {
	const [isEditing, setIsEditing] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<div
			className='
				flex
				w-full h-14
				text-sm
				justify-between items-center
			'
		>
			{isEditing ? (
				<InputText
					className='
						w-7/10
						text-sm
						border-r-2
						focus:outline-none
					'
					placeholder={placeholder}
					ref={inputRef}
				/>
			) : (
				<p
					className={`
					w-7/10
					text-sm
					${onSave !== undefined && 'border-r-2'}
				`}
				>{`${field} = ${fieldValue}`}</p>
			)}
			{children}
			{onSave !== undefined && (
				<div className='flex items-center just-center gap-3'>
					<button
						className='cursor-pointer'
						onClick={() => setIsEditing(!isEditing)}
						type='button'
					>
						<Edit />
					</button>
					<Button
						onClick={() => {
							onSave(inputRef.current?.value)
							setIsEditing(false)
						}}
					>
						{' '}
						Save
					</Button>
				</div>
			)}
		</div>
	)
}

export default GroupInfoField
