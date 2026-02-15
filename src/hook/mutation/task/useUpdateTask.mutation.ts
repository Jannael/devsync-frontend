import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TASK_KEYS } from '../../../constant/TaskKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import TaskService from '../../../service/Task.service'

export const useUpdateTask = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (args: {
			_id: string
			groupId: string
			data: {
				name?: string
				description?: string
				code?: {
					language: string
					content: string
				}
				user?: string[]
				priority?: number
				isComplete?: boolean
			}
		}) => TaskService.Update(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: TASK_KEYS.DETAIL(variables._id),
			})
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
