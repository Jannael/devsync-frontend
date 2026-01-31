import { useRef } from 'react'
import { Edit } from '../../icons'
import Button from './Button'
import P from './P'
import Textarea from './Textarea'

function EditableP({
	updateDescription,
	description,
	handleUpdateDescription,
	setUpdateDescription,
	edit
}: {
	updateDescription: boolean
	description: string
	handleUpdateDescription: (val: string) => void
	setUpdateDescription: React.Dispatch<React.SetStateAction<boolean>>
	edit?: boolean
}) {
	const descriptionRef = useRef<HTMLTextAreaElement>(null)

	return (
		<div className='flex-1 relative'>
			{!updateDescription ? (
				<P className='size-full border border-contrast rounded-xl p-3'>
					{description || 'Description...'}
				</P>
			) : (
				<>
					<Textarea
						className='flex-1 size-full max-h-100'
						name='description'
						placeholder='update task description by doing ...'
						ref={descriptionRef}
					/>
					<Button
						className='absolute right-0 m-3'
						onClick={() =>
							handleUpdateDescription(descriptionRef.current!.value)
						}
					>
						Save
					</Button>
				</>
			)}
			{edit && <Button
				className='absolute right-0 bottom-0 m-3'
				onClick={() => setUpdateDescription(!updateDescription)}
			>
				<Edit />
			</Button>}
		</div>
	)
}

export default EditableP
