import { useMutation } from '@tanstack/react-query'
import UserModel from '../../service/api/models/user/model'

function useInviteUser(onSuccess: () => void) {
	const inviteUser = useMutation({
		mutationFn: UserModel.createInvitation,
		onSuccess,
	})

	return { inviteUser }
}
export default useInviteUser
