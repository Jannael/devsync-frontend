import { useState } from 'react'
import { useSearchParams } from 'react-router'
import useDeleteTask from '../task/useDeleteTask'
import useTaskList from '../task/useTaskList'

function useGroupComponent() {
	const [searchParams] = useSearchParams()
	const groupId = searchParams.get('groupId')

	const [currentTaskId, setCurrentTaskId] = useState<string>()
	const { taskListQuery } = useTaskList()
	const { deleteTask } = useDeleteTask()

	const taskList = taskListQuery?.data?.pages.flatMap(
		(page) => page.result.task,
	)

	const handleDeleteTask = () => {
		deleteTask.mutate({
			groupId: groupId || '',
			_id: currentTaskId || taskList?.[0]?._id,
		})
	}

	const handleSeeMore = () => {
		taskListQuery.fetchNextPage()
	}

	return {
		handleSeeMore,
		groupId,
		currentTaskId,
		taskList,
		setCurrentTaskId,
		handleDeleteTask,
	}
}

export default useGroupComponent
