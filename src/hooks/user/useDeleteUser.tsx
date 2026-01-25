import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { routesConst } from '../../routes.constants'
import UserModel from '../../service/api/models/user/model'

function useDeleteUser() {
	const deleteUser = useMutation({
		mutationFn: UserModel.delete,
		onSuccess: () => {
			window.location.href = routesConst.login
		},
	})
	if (deleteUser.isError) toast.error(deleteUser.error.message)
	return { deleteUser }
}

export default useDeleteUser
