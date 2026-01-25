import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import queryKeys from '../../queryKeys'
import UserModel from '../../service/api/models/user/model'

function useAcceptInvitation() {
	const queryClient = useQueryClient()
	const acceptInvitation = useMutation({
		mutationFn: UserModel.acceptInvitation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.invitationList] })
		},
	})
	if (acceptInvitation.isError) toast.error(acceptInvitation.error.message)
	return { acceptInvitation }
}

export default useAcceptInvitation
