import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import queryKeys from '../queryKeys'
import TaskModel from '../service/api/models/task/model'

function useTaskList({ taskPage }: { taskPage: number }) {
	const [searchParams] = useSearchParams()

	const taskListQuery = useInfiniteQuery({
		queryFn: async ({ pageParam }: { pageParam: number }) => {
			const groupId = searchParams.get('groupId')
			if (groupId === null) return

			return TaskModel.list({
				groupId: groupId,
				pagination: pageParam,
			})
		},
		queryKey: [queryKeys.taskList, taskPage],
		retry: false,
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			if (lastPage.result.task.length === 0) {
				return undefined
			}

			return taskPage + 1
		},
	})

	return { taskListQuery }
}

export default useTaskList
