import ROLES from '../../constant/Roles.constant'
import { CheckIcon, XIcon } from '../../Icon'
import type { TaskList } from '../../interface/Task.d'
import useMainStore from '../../store/Main.store'

function TaskListItem({ task }: { task: TaskList['task'][number] }) {
	const currentRole = useMainStore((state) => state.currentRole)
	const setCurrentTask = useMainStore((state) => state.setCurrentTask)
	const setShowSolveBtn = useMainStore((state) => state.setShowSolveBtn)

	return (
		<li
			className='flex items-center justify-between w-full border-b border-primary p-2 cursor-pointer'
			key={task._id}
			onClick={() => {
				setCurrentTask(task._id)
				setShowSolveBtn(true)
			}}
		>
			<span className='w-12 px-2 pr-4 h-10 flex items-center'>
				{task.priority}
			</span>
			<span className='flex-1 truncate h-10 flex items-center'>
				{task.name}
			</span>
			{currentRole === ROLES.techLead && (
				<span className='flex justify-end size-8 text-primary'>
					{task.isComplete ? <CheckIcon /> : <XIcon />}
				</span>
			)}
		</li>
	)
}

export default TaskListItem
