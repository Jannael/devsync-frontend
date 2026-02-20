import { useState } from 'react'
import ROLES from '../constant/Roles.constant'
import useMainStore from '../store/Main.store'
import TaskListComponent from './TaskList.component'
import Button from './ui/Button.ui'

function TaskListMenu() {
	const currentRole = useMainStore((state) => state.currentRole)
	const currentTask = useMainStore((state) => state.currentTask)
	const currentTaskIsCompleted = useMainStore(
		(state) => state.currentTaskIsCompleted,
	)
	const [selected, setSelected] = useState<'tasks' | 'assign'>('tasks')

	return (
		<section className='flex-1 h-full p-3' id='Tasks'>
			<article
				className='h-full bg-main flex flex-col items-center
			border-primary border py-5 rounded-lg px-3 gap-6 overflow-y-auto'
			>
				<header className='flex w-full justify-around items-center border-b border-primary pb-3'>
					<button
						className={`flex-1 text-center rounded-lg cursor-pointer py-2 ${selected === 'tasks' ? 'bg-accent' : ''}`}
						onClick={() => setSelected('tasks')}
						type='button'
					>
						Tasks
					</button>
					{(currentRole === ROLES.techLead ||
						currentRole === ROLES.documenter) && (
						<button
							className={`flex-1 text-center rounded-lg cursor-pointer py-2 ${selected === 'assign' ? 'bg-accent' : ''}`}
							onClick={() => setSelected('assign')}
							type='button'
						>
							Assign
						</button>
					)}
				</header>
				<TaskListComponent selected={selected} />
				{(currentRole === ROLES.techLead || currentRole === ROLES.developer) &&
					!currentTaskIsCompleted &&
					currentTask && (
						<Button
							block={false}
							className='w-full bg-accent rounded-lg py-2 cursor-pointer'
							onClick={() => {}}
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
