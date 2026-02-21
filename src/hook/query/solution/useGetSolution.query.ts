import { useQuery } from '@tanstack/react-query'
import { SOLUTION_KEYS } from '../../../constant/SolutionKeys.constant'
import SolutionService from '../../../service/Solution.service'

export const useGetSolution = (args: { _id: string; groupId: string }) => {
	const query = useQuery({
		queryKey: SOLUTION_KEYS.DETAIL(args._id),
		queryFn: () => SolutionService.Get(args),
		enabled: !!args._id && !!args.groupId,
		retry: false,
		staleTime: Infinity,
	})

	return query
}
