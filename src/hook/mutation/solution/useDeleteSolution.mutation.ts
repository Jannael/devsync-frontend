import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SOLUTION_KEYS } from '../../../constant/SolutionKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import SolutionService from '../../../service/Solution.service'

export const useDeleteSolution = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (args: { _id: string; groupId: string }) =>
			SolutionService.Delete(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: SOLUTION_KEYS.DETAIL(variables._id),
			})
		},
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
