import { useQuery } from '@tanstack/react-query'
import { MEMBER_KEYS } from '../../../constant/MemberKeys.constant'
import MemberService from '../../../service/Member.service'

export const useGetMembers = (groupId: string) => {
	return useQuery({
		queryKey: MEMBER_KEYS.LIST(groupId),
		queryFn: () => MemberService.Get({ groupId }),
		enabled: !!groupId,
	})
}
