import { useMutation } from '@tanstack/react-query'
import AuthModel from '../../service/api/models/auth/model'

function useLogout(onSuccess?: () => void) {
	const logoutMutation = useMutation({
		mutationFn: AuthModel.requestLogout,
		onSuccess,
	})
	return { logoutMutation }
}

export default useLogout
