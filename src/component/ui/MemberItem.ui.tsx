import { XIcon } from '../../Icon'
import useTaskStore from '../../store/Task.store'

function MemberItem({
	member,
	onRemove,
}: {
	member: string
	onRemove: (member: string) => void
}) {
	const isSolution = useTaskStore((state) => state.isSolution)
	const edit = useTaskStore((state) => state.edit)
	const create = useTaskStore((state) => state.create)

	const showInput =
		(isSolution && edit) || // only show input when you update a solution
		(edit && !isSolution) || // only show input when you update a task
		(create && !isSolution) // only show input when you create a task

	return (
		<li
			className={`border-b border-primary/50 rounded-lg px-3 py-2 w-full flex items-center ${!showInput ? 'justify-center' : 'justify-between'}`}
		>
			<span className={`${!showInput ? 'w-full' : 'w-fit'}`}>{member}</span>
			{showInput && (
				<button
					className='cursor-pointer w-fit'
					onClick={() => onRemove(member)}
					type='button'
				>
					<XIcon />
				</button>
			)}
		</li>
	)
}

export default MemberItem
