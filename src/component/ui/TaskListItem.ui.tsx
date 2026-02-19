import ROLES from '../../constant/Roles.constant'
import { CheckIcon, XIcon } from '../../Icon'
import type { TaskList } from '../../interface/Task.d'
import useMainStore from '../../store/Main.store'

function TaskListItem({ task }: { task: TaskList['task'][number] }) {
	const currentRole = useMainStore((state) => state.currentRole)
	const setCurrentTask = useMainStore((state) => state.setCurrentTask)
	return (
		<li
			className='flex items-center justify-between w-full border-b border-primary pb-2 cursor-pointer'
			key={task._id}
			onClick={() => {
				setCurrentTask(task._id)
			}}
		>
			<span className='w-fit px-2 pr-4'>{task.priority}</span>
			<span className='flex-1 truncate'>{task.name}</span>
			{currentRole === ROLES.techLead && (
				<span className='w-fit flex justify-end size-10 text-primary'>
					{task.isComplete ? <CheckIcon /> : <XIcon />}
				</span>
			)}
		</li>
	)
}

export default TaskListItem
