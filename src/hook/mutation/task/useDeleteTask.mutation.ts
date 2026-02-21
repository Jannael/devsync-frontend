import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TASK_KEYS } from '../../../constant/TaskKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import TaskService from '../../../service/Task.service'

export const useDeleteTask = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (args: { _id: string; groupId: string }) =>
			TaskService.Delete(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: TASK_KEYS.LIST(variables.groupId),
			})
		},
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
