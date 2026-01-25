import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import solutionModel from '../../service/api/models/solution/model'

function useSolveTask(onSuccess: () => void) {
	const solveTask = useMutation({
		mutationFn: solutionModel.create,
		onSuccess,
	})
	if (solveTask.isError) toast.error(solveTask.error.message)
	return { solveTask }
}

export default useSolveTask
