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
	edit
}: {
	updateTitle: boolean
	name: string
	handleUpdateTitle: (val: string) => void
	setUpdateTitle: React.Dispatch<React.SetStateAction<boolean>>
	edit?: boolean
}) {
	const TitleRef = useRef<HTMLInputElement>(null)
	return (
		<div
			className={`size-full p-3 flex justify-between ${updateTitle ? 'items-end' : 'items-center'} gap-2`}
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
			{edit && <Button onClick={() => setUpdateTitle(!updateTitle)}>
				<Edit />
			</Button>}
		</div>
	)
}

export default EditableTitle
