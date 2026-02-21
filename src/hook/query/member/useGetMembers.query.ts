import { useQuery } from '@tanstack/react-query'
import { MEMBER_KEYS } from '../../../constant/MemberKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import MemberService from '../../../service/Member.service'

export const useGetMembers = (groupId: string) => {
	const query = useQuery({
		queryKey: MEMBER_KEYS.LIST(groupId),
		queryFn: () => MemberService.Get({ groupId }),
		enabled: !!groupId,
	})

	useShowErrorFromServer({
		isError: query.isError,
		error: query.error,
	})

	return query
}
