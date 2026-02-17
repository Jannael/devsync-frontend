import { useState } from 'react'
import { toast } from 'sonner'
import { EditIcon } from '../../Icon'
import Button from './Button.ui'
import CancelBtn from './CancelBtn.ui'
import Input from './Input.ui'
import Label from './Label.ui'

function UpdateTextInput({
	label,
	value,
	onSave,
	placeholder,
}: {
	label: string
	value: string
	onSave: (value: string, cb: (error: string | null) => void) => void
	placeholder?: string
}) {
	const [isEditing, setIsEditing] = useState(false)
	const [innerVal, setInnerVal] = useState(value)

	if (isEditing) {
		return (
			<article className='flex w-full justify-between items-center h-20 border-b-2 border-primary/50 pb-6'>
				<div className='flex flex-col w-fit gap-3'>
					<Label id={label}>{label}</Label>
					<Input
						id={label}
						name={label}
						onChange={(e) => setInnerVal(e.target.value)}
						placeholder={placeholder ?? ''}
						type='text'
						value={innerVal}
					/>
				</div>
				<div className='flex gap-3'>
					<CancelBtn block={false} onClick={() => setIsEditing(false)} />
					<Button
						block={false}
						className='flex text-xl justify-center items-center gap-2'
						onClick={() => {
							onSave(innerVal, (error) => {
								if (error) {
									toast.error(error)
									return
								}
								setIsEditing(false)
							})
						}}
						type='button'
					>
						Save
					</Button>
				</div>
			</article>
		)
	}

	return (
		<article className='flex w-full justify-between items-center h-20 border-b-2 border-primary/50 pb-6'>
			<div className='flex flex-col w-fit gap-3'>
				<Label id={label}>{label}</Label>
				<p className='text-xl text-txt/80'>{value || placeholder}</p>
			</div>
			<Button
				block={false}
				className='flex text-xl justify-center items-center gap-2'
				onClick={() => {
					setInnerVal(value)
					setIsEditing(true)
				}}
				type='button'
			>
				<EditIcon />
			</Button>
		</article>
	)
}
export default UpdateTextInput
