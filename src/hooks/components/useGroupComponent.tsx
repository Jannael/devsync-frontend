import { useState } from 'react'
import { useSearchParams } from 'react-router'
import useTaskList from '../task/useTaskList'

function useGroupComponent() {
	const [searchParams] = useSearchParams()
	const groupId = searchParams.get('groupId')

	const [currentTaskId, setCurrentTaskId] = useState<string>()
	const { taskListQuery } = useTaskList()

	const handleSeeMore = () => {
		taskListQuery.fetchNextPage()
	}

	const taskList = taskListQuery?.data?.pages.flatMap(
		(page) => page.result.task,
	)

	return {
		handleSeeMore,
		groupId,
		currentTaskId,
		taskList,
		setCurrentTaskId,
	}
}

export default useGroupComponent
