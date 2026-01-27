import { useRef } from 'react'
import { Edit } from '../../icons'
import Button from '../ui/Button'
import InputText from '../ui/InputText'
import Label from '../ui/Label'
import Title from '../ui/Title'

function EditableTitle({
	updateTitle,
	name,
	handleUpdateTitle,
	setUpdateTitle,
	isComplete,
}: {
	updateTitle: boolean
	name: string
	handleUpdateTitle: (val: string) => void
	setUpdateTitle: React.Dispatch<React.SetStateAction<boolean>>
	isComplete: boolean
}) {
	const TitleRef = useRef<HTMLInputElement>(null)
	return (
		<div
			className={`w-full p-3 flex justify-between ${updateTitle ? 'items-end' : 'items-center'} gap-2`}
		>
			{!updateTitle ? (
				<Title className='mb-4 flex-1'>{name || 'Task'}</Title>
			) : (
				<>
					<Label>
						Task name
						<InputText
							className='flex-1'
							placeholder='chore: update tasks name'
							ref={TitleRef}
						/>
					</Label>
					<Button
						onClick={() => {
							handleUpdateTitle(TitleRef.current?.value || '')
						}}
					>
						Save
					</Button>
				</>
			)}
			<Button onClick={() => setUpdateTitle(!updateTitle)}>
				<Edit />
			</Button>
			{isComplete ? <Button>Solution</Button> : <Button>Solve</Button>}
		</div>
	)
}

export default EditableTitle
