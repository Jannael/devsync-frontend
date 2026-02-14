import { useQuery } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import GroupService from '../../../service/Group.service'

export const useGetGroupInvitations = (groupId: string) => {
	return useQuery({
		queryKey: GROUP_KEYS.INVITATIONS(groupId),
		queryFn: () => GroupService.GetInvitation({ groupId }),
		enabled: !!groupId,
	})
}
