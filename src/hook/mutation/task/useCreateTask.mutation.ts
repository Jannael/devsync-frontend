import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TASK_KEYS } from '../../../constant/TaskKeys.constant'
import TaskService from '../../../service/Task.service'

export const useCreateTask = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (args: {
			groupId: string
			data: {
				name: string
				description: string
				user?: string[]
				feature?: string[]
				priority?: number
				code?: {
					language: string
					content: string
				}
				isComplete?: boolean
			}
		}) => TaskService.Create(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: TASK_KEYS.LIST(variables.groupId),
			})
		},
	})
}
