import { useQuery } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import GroupService from '../../../service/Group.service'

export const useGetGroupInvitations = (groupId: string) => {
	const query = useQuery({
		queryKey: GROUP_KEYS.INVITATIONS(groupId),
		queryFn: () => GroupService.GetInvitation({ groupId }),
		enabled: !!groupId,
	})

	useShowErrorFromServer({
		isError: query.isError,
		error: query.error,
	})

	return query
}
