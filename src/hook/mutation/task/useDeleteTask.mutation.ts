import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TASK_KEYS } from '../../../constant/TaskKeys.constant'
import TaskService from '../../../service/Task.service'

export const useDeleteTask = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (args: { _id: string; groupId: string }) =>
			TaskService.Delete(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: TASK_KEYS.LIST(variables.groupId),
			})
		},
	})
}
