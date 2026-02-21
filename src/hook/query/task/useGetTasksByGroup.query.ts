import { useInfiniteQuery } from '@tanstack/react-query'
import { TASK_KEYS } from '../../../constant/TaskKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import TaskService from '../../../service/Task.service'

export const useGetTasksByGroup = (args: { groupId: string }) => {
	const query = useInfiniteQuery({
		queryKey: TASK_KEYS.LIST(args.groupId),
		queryFn: ({ pageParam = 0 }) =>
			TaskService.List({ groupId: args.groupId, page: pageParam }),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			return lastPage.metadata?.hasNextPage
				? lastPage.metadata.currentPage + 1
				: undefined
		},
		enabled: !!args.groupId,
	})

	useShowErrorFromServer({
		isError: query.isError,
		error: query.error,
	})

	return query
}
