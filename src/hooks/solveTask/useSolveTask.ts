import { useMutation } from '@tanstack/react-query'
import solutionModel from '../../service/api/models/solution/model'

function useSolveTask(onSuccess: () => void) {
	const solveTask = useMutation({
		mutationFn: solutionModel.create,
    onSuccess
	})
	return { solveTask }
}

export default useSolveTask
