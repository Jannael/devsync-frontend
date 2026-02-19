import { useGetTasksByGroup } from '../hook/query/task/useGetTasksByGroup.query'
import useMainStore from '../store/Main.store'
import TaskListItem from './ui/TaskListItem.ui'

function TaskListComponent({ selected }: { selected: 'tasks' | 'assign' }) {
	const currentGroup = useMainStore((state) => state.currentGroup)
	const { data: taskPages } = useGetTasksByGroup({
		groupId: currentGroup ?? '',
	})
	const data = taskPages?.pages.reduce(
		(acc, page) => {
			return {
				task: [...acc.task, ...page.task],
				assign: [...acc.assign, ...page.assign],
			}
		},
		{
			task: [],
			assign: [],
		},
	)

	const taskItems = data?.task.map((task) => {
		return <TaskListItem key={task._id} task={task} />
	})

	const assignItems = data?.assign.map((task) => {
		return <TaskListItem key={task._id} task={task} />
	})

	return (
		<ul className='px-3'>
			{data && data?.task.length > 0 && selected === 'tasks'
				? taskItems
				: assignItems}
			{taskPages === undefined && <p>Please click a group to see its tasks</p>}
			{data?.task.length === 0 && <p>There are no tasks to show</p>}
		</ul>
	)
}

export default TaskListComponent
