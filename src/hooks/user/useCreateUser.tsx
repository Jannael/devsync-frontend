import { useMutation } from '@tanstack/react-query'
import userModel from '../../service/api/models/user/model'

function useCreateUser(onSuccess: () => void) {
	const create = useMutation({
		mutationFn: userModel.create,
		onSuccess,
	})
	return { create }
}
export default useCreateUser
