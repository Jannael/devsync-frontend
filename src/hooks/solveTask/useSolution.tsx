import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import SolutionModel from '../../service/api/models/solution/model'

function useSolution({ taskId, groupId }: { taskId: string; groupId: string }) {
	const solution = useQuery({
		queryFn: async () => {
			return await SolutionModel.get({ taskId, groupId })
		},
		queryKey: [taskId],
		retry: false
	})
	if (solution.isError) toast.error(solution.error.message)
	return solution
}

export default useSolution
