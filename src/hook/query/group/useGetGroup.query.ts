import { useQuery } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import GroupService from '../../../service/Group.service'

export const useGetGroup = (groupId: string) => {
	return useQuery({
		queryKey: GROUP_KEYS.DETAIL(groupId),
		queryFn: () => GroupService.Get({ groupId }),
		enabled: !!groupId,
	})
}
