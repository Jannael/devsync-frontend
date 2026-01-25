import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import UserModel from '../../service/api/models/user/model'

function useUpdateUser(onSuccess: () => void) {
	const updateUser = useMutation({
		mutationFn: UserModel.update,
		onSuccess,
	})
	if (updateUser.isError) toast.error(updateUser.error.message)
	return { updateUser }
}

export default useUpdateUser
