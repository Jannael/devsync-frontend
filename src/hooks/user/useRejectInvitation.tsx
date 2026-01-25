import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import queryKeys from '../../queryKeys'
import UserModel from '../../service/api/models/user/model'

function useRejectInvitation() {
	const queryClient = useQueryClient()
	const rejectInvitation = useMutation({
		mutationFn: UserModel.rejectInvitation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.invitationList] })
		},
	})
	if (rejectInvitation.isError) toast.error(rejectInvitation.error.message)
	return { rejectInvitation }
}

export default useRejectInvitation
