import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import SolutionModel from '../../service/api/models/solution/model'

function useUpdateSolution() {
	const queryClient = useQueryClient()
	const updateSolution = useMutation({
		mutationFn: SolutionModel.update,
		onSuccess: (_, data) => {
			queryClient.invalidateQueries({ queryKey: [data.taskId] })
		},
	})

	if (updateSolution.isError) toast.error(updateSolution.error.message)
	return { updateSolution }
}

export default useUpdateSolution
