import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import UserModel from '../../service/api/models/user/model'

function useInviteUser(onSuccess: () => void) {
	const inviteUser = useMutation({
		mutationFn: UserModel.createInvitation,
		onSuccess,
	})
	if (inviteUser.isError) toast.error(inviteUser.error.message)
	return { inviteUser }
}
export default useInviteUser
