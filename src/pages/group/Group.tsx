import { useState } from 'react'
import CurrentSolution from '../../components/CurrentSolution'
import CurrentTask from '../../components/group/CurrentTask'
import TaskItem from '../../components/group/TaskItem'
import Button from '../../components/ui/Button'
import Page from '../../components/ui/Page'
import useGroupComponent from '../../hooks/components/useGroupComponent'
import useGetTask from '../../hooks/task/useGetTask'
import useRole from '../../hooks/useRole'
import useUser from '../../hooks/user/useUser'
import { routesConst } from '../../routes.constants'

function Group() {
	const {
		handleSeeMore,
		groupId,
		currentTaskId,
		taskList,
		setCurrentTaskId,
		handleDeleteTask,
	} = useGroupComponent()
	const [showSolution, setShowSolution] = useState(false)
	const { isTechLead } = useRole({ groupId })
	const { task: currentTask } = useGetTask({
		groupId,
		currentTaskId: currentTaskId || taskList?.[0]?._id,
	})
	const { data: user } = useUser()

	const isAssignedToCurrentTask = currentTask.data?.user.includes(
		user?.result?.account,
	)

	const taskElements = taskList?.map(
		(task: {
			_id: string
			name: string
			priority: number
			isComplete: boolean
		}) => {
			return (
				<TaskItem
					isComplete={task.isComplete}
					key={task._id}
					name={task.name}
					onClick={() => {
						setCurrentTaskId(task._id)
					}}
					onDelete={handleDeleteTask}
					priority={task.priority}
				/>
			)
		},
	)

	return (
		<Page className='flex justify-center items-center'>
			<section className='flex flex-col w-2/10 h-dvh p-3 border-r'>
				<ul
					className='
						flex flex-col overflow-y-auto flex-1
						overflow-x-hidden
						size-full gap-2 relative items-center
					'
				>
					{taskElements}
				</ul>
				<Button className='mt-5' onClick={handleSeeMore}>
					See more
				</Button>
				{isTechLead && (
					<Button
						className='mt-5'
						onClick={() => {
							window.location.href = `${routesConst.createTask}?groupId=${groupId}`
						}}
					>
						Create
					</Button>
				)}
				{isAssignedToCurrentTask && (
					<Button
						className='mt-5'
						onClick={() => {
							window.location.href = `${routesConst.solveTask}?groupId=${groupId}&taskId=${currentTaskId || taskList?.[0]?._id}`
						}}
					>
						Solve
					</Button>
				)}
			</section>
			{showSolution ? (
				<CurrentSolution
					groupId={groupId || ''}
					setShowSolution={setShowSolution}
					taskId={currentTaskId || taskList?.[0]?._id}
				/>
			) : (
				<CurrentTask
					currentTaskId={currentTaskId || taskList?.[0]?._id}
					setShowSolution={setShowSolution}
				/>
			)}
		</Page>
	)
}

export default Group
