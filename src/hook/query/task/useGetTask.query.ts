import { useQuery } from '@tanstack/react-query'
import { TASK_KEYS } from '../../../constant/TaskKeys.constant'
import TaskService from '../../../service/Task.service'

export const useGetTask = (args: { _id: string; groupId: string }) => {
	return useQuery({
		queryKey: TASK_KEYS.DETAIL(args._id),
		queryFn: () => TaskService.Get(args),
		enabled: !!args._id && !!args.groupId,
	})
}
