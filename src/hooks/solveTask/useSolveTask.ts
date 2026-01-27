import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import queryKeys from '../../queryKeys'
import solutionModel from '../../service/api/models/solution/model'

function useSolveTask(onSuccess: () => void) {
	const queryClient = useQueryClient()
	const solveTask = useMutation({
		mutationFn: solutionModel.create,
		onSuccess: (_, data) => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.taskDetail, data.taskId],
			})

			onSuccess()
		},
	})
	if (solveTask.isError) toast.error(solveTask.error.message)
	return { solveTask }
}

export default useSolveTask
