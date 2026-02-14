import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SOLUTION_KEYS } from '../../../constant/SolutionKeys.constant'
import SolutionService from '../../../service/Solution.service'

export const useCreateSolution = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (args: {
			groupId: string
			data: {
				_id: string
				description: string
				feature?: string[]
				code?: {
					language: string
					content: string
				}
			}
		}) => SolutionService.Create(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: SOLUTION_KEYS.DETAIL(variables.data._id),
			})
		},
	})
}
