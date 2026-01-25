import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import queryKeys from '../../queryKeys'
import TaskModel from '../../service/api/models/task/model'

function useTaskList() {
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
		queryKey: [queryKeys.taskList],
		retry: false,
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			if (lastPage.result.task.length === 0) {
				return undefined
			}
			const nextPageParam = lastPage.result.task.length / 10
			if (nextPageParam % 1 !== 0) {
				toast.info('There are no more tasks')
				return undefined
			}
			return nextPageParam
		},
	})
	if (taskListQuery.isError) toast.error(taskListQuery.error.message)

	return { taskListQuery }
}

export default useTaskList
