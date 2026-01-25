import { useQuery } from '@tanstack/react-query'
import queryKeys from '../../queryKeys'
import TaskModel from '../../service/api/models/task/model'

function useGetTask({
	groupId,
	currentTaskId,
}: {
	groupId: string | undefined | null
	currentTaskId: string | undefined
}) {
	const task = useQuery({
		queryFn: async ({ signal }) => {
			if (!groupId) return null
			if (!currentTaskId) return null

			const res = await TaskModel.get({
				_id: currentTaskId,
				groupId: groupId,
				signal,
			})

			return res.result
		},
		queryKey: [queryKeys.taskDetail, currentTaskId],
		enabled: !!currentTaskId && !!groupId,
		retry: false,
	})
	return { task }
}

export default useGetTask
