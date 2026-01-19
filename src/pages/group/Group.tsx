import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import CurrentTask from '../../components/group/CurrentTask'
import TaskItem from '../../components/group/TaskItem'
import Button from '../../components/ui/Button'
import Page from '../../components/ui/Page'
import useTaskList from '../../hooks/useTaskList'
import { routesConst } from '../../routes.constants'

function Group() {
	const scrollRef = useRef<HTMLUListElement>(null)
	const [searchParams] = useSearchParams()
	const groupId = searchParams.get('groupId')

	const [taskPage, setTaskPage] = useState(0)
	const [currentTaskId, setCurrentTaskId] = useState<string>()
	const { taskListQuery } = useTaskList({ taskPage })

	const handleScroll = () => {
		if (scrollRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = scrollRef.current

			if (scrollTop + clientHeight >= scrollHeight - 5) {
				setTaskPage((prev) => prev + 1)
			}
		}
	}

	const taskList = taskListQuery?.data?.pages.flatMap(
		(page) => page.result.task,
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
						window.location.href = `${routesConst.solveTask}?groupId=${groupId}?taskId=${currentTaskId}`
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
