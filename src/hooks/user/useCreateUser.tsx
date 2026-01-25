import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import userModel from '../../service/api/models/user/model'

function useCreateUser(onSuccess: () => void) {
	const create = useMutation({
		mutationFn: userModel.create,
		onSuccess,
	})
	if (create.isError) toast.error(create.error.message)
	return { create }
}
export default useCreateUser
