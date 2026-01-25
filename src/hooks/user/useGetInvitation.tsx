import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import queryKeys from '../../queryKeys'
import UserModel from '../../service/api/models/user/model'

function useGetInvitation() {
	const invitation = useQuery({
		queryKey: [queryKeys.invitationList],
		queryFn: UserModel.getInvitation,
	})
	if (invitation.isError) toast.error(invitation.error.message)

	return { data: invitation.data }
}

export default useGetInvitation
