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
			<article className='flex w-full flex-col sm:flex-row justify-between items-start sm:items-center min-h-20 h-auto gap-4 border-b-2 border-primary/50 pb-6'>
				<div className='flex flex-col w-full sm:w-fit gap-3'>
					<Label id={label}>{label}</Label>
					<Input
						className='w-full'
						id={label}
						name={label}
						onChange={(e) => setInnerVal(e.target.value)}
						placeholder={placeholder ?? ''}
						type='text'
						value={innerVal}
					/>
				</div>
				<div className='flex gap-3 w-full sm:w-fit'>
					<CancelBtn
						block={false}
						className='w-full sm:w-fit'
						onClick={() => setIsEditing(false)}
					/>
					<Button
						block={false}
						className='flex text-xl justify-center items-center gap-2 w-full sm:w-fit'
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
		<article className='flex w-full flex-col sm:flex-row justify-between items-start sm:items-center min-h-20 h-auto gap-4 border-b-2 border-primary/50 pb-6'>
			<div className='flex flex-col w-full sm:w-fit gap-3 overflow-hidden'>
				<Label id={label}>{label}</Label>
				<p className='text-xl text-txt/80 wrap-break-word whitespace-normal'>{value || placeholder}</p>
			</div>
			<Button
				block={false}
				className='flex text-xl justify-center items-center gap-2 w-full sm:w-fit'
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
