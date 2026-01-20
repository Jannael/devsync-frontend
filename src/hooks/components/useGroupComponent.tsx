import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import useTaskList from '../auth/useTaskList'

function useGroupComponent() {
	const [searchParams] = useSearchParams()
	const groupId = searchParams.get('groupId')

	const scrollRef = useRef<HTMLUListElement>(null)

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

	return {
		handleScroll,
		scrollRef,
		groupId,
		currentTaskId,
		taskList,
		setCurrentTaskId,
	}
}

export default useGroupComponent
