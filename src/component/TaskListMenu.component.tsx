import { useState } from 'react'
import ROLES from '../constant/Roles.constant'
import { useGetTask } from '../hook/query/task/useGetTask.query'
import useMainStore from '../store/Main.store'
import useTaskStore from '../store/Task.store'
import TaskListComponent from './TaskList.component'
import Button from './ui/Button.ui'

function TaskListMenu() {
	const setIsSolution = useTaskStore((state) => state.setIsSolution)
	const setCreate = useTaskStore((state) => state.setCreate)
	const currentRole = useMainStore((state) => state.currentRole)
	const currentTask = useMainStore((state) => state.currentTask)
	const currentGroup = useMainStore((state) => state.currentGroup)
	const showSolveBtn = useMainStore((state) => state.showSolveBtn)
	const setShowSolveBtn = useMainStore((state) => state.setShowSolveBtn)

	const { data: task } = useGetTask({
		_id: currentTask ?? '',
		groupId: currentGroup ?? '',
	})
	const [selected, setSelected] = useState<'tasks' | 'assign'>('tasks')

	return (
		<section className='flex-1 h-full p-3' id='Tasks'>
			<article
				className='h-full bg-main flex flex-col items-center
			border-primary border py-5 rounded-lg px-3 gap-6 overflow-y-auto'
			>
				<div className='flex-1 w-full'>
					<header className='flex w-full justify-around items-center border-b border-primary pb-3 mb-3'>
						<button
							className={`flex-1 text-center rounded-lg cursor-pointer py-2 text-txt ${selected === 'tasks' ? 'bg-shade' : ''}`}
							onClick={() => {
								setSelected('tasks')
								setShowSolveBtn(false)
							}}
							type='button'
						>
							Tasks
						</button>
						{(currentRole === ROLES.techLead ||
							currentRole === ROLES.documenter) && (
							<button
								className={`flex-1 text-center rounded-lg cursor-pointer py-2 text-txt ${selected === 'assign' ? 'bg-shade' : ''}`}
								onClick={() => {
									setSelected('assign')
									setShowSolveBtn(false)
								}}
								type='button'
							>
								Assign
							</button>
						)}
					</header>
					<TaskListComponent selected={selected} />
				</div>

				{currentTask &&
					showSolveBtn &&
					(currentRole === ROLES.techLead || currentRole === ROLES.developer) &&
					!task?.isComplete && (
						<Button
							block={false}
							className='w-full bg-accent rounded-lg py-2 cursor-pointer'
							onClick={() => {
								setIsSolution(true)
								setCreate(true)
							}}
							type='button'
						>
							SOLVE
						</Button>
					)}
			</article>
		</section>
	)
}

export default TaskListMenu
