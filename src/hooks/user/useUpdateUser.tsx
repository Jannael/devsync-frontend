import { useMutation } from '@tanstack/react-query'
import UserModel from '../../service/api/models/user/model'

function useUpdateUser(onSuccess: () => void) {
	const updateUser = useMutation({
		mutationFn: UserModel.update,
		onSuccess,
	})

	return { updateUser }
}

export default useUpdateUser
