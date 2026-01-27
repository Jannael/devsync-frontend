import { useQuery } from '@tanstack/react-query'
import SolutionModel from '../../service/api/models/solution/model'

function useSolution({ taskId, groupId }: { taskId: string; groupId: string }) {
	const solution = useQuery({
		queryFn: () => {
			return SolutionModel.get({ taskId, groupId })
		},
		queryKey: [taskId],
	})
	return solution
}

export default useSolution
