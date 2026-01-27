import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import SolutionModel from '../../service/api/models/solution/model'

function useDeleteSolution(onSuccess: () => void) {
	const deleteSolution = useMutation({
		mutationFn: SolutionModel.delete,
		onSuccess,
	})
	if (deleteSolution.isError) toast.error(deleteSolution.error.message)
	return { deleteSolution }
}

export default useDeleteSolution
