import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import queryKeys from '../../queryKeys'
import userModel from '../../service/api/models/user/model'

function useGetUsersGroup() {
	const group = useQuery({
		queryFn: userModel.getGroup,
		queryKey: [queryKeys.groupsList],
		retry: 1,
	})

	if (group.isError) toast.error(group.error.message)
	return { data: group.data }
}

export default useGetUsersGroup
