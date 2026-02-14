import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SOLUTION_KEYS } from '../../../constant/SolutionKeys.constant'
import SolutionService from '../../../service/Solution.service'

export const useUpdateSolution = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (args: {
			_id: string
			groupId: string
			data: {
				feature?: string[]
				description?: string
				code?: {
					language: string
					content: string
				}
			}
		}) => SolutionService.Update(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: SOLUTION_KEYS.DETAIL(variables._id),
			})
		},
	})
}
