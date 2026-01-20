import CurrentTask from '../../components/group/CurrentTask'
import TaskItem from '../../components/group/TaskItem'
import Button from '../../components/ui/Button'
import Page from '../../components/ui/Page'
import useGroupComponent from '../../hooks/components/useGroupComponent'
import { routesConst } from '../../routes.constants'

function Group() {
	const {
		handleScroll,
		scrollRef,
		groupId,
		currentTaskId,
		taskList,
		setCurrentTaskId,
	} = useGroupComponent()

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
					priority={task.priority}
				/>
			)
		},
	)

	return (
		<Page className='flex justify-center items-center'>
			<section className='flex flex-col w-2/10 h-dvh'>
				<ul
					className='
						flex flex-col overflow-auto flex-1
						size-full gap-2 relative
					'
					onScroll={handleScroll}
					ref={scrollRef}
				>
					{taskElements}
				</ul>
				<Button
					className='mt-5'
					onClick={() => {
						window.location.href = `${routesConst.createTask}?groupId=${groupId}`
					}}
				>
					Create
				</Button>
				<Button
					className='mt-5'
					onClick={() => {
						window.location.href = `${routesConst.solveTask}?groupId=${groupId}&taskId=${currentTaskId || taskList?.[0]?._id}`
					}}
				>
					Solve
				</Button>
			</section>
			<CurrentTask currentTaskId={currentTaskId || taskList?.[0]?._id} />
		</Page>
	)
}

export default Group
