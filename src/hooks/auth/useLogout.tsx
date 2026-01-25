import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import AuthModel from '../../service/api/models/auth/model'

function useLogout(onSuccess?: () => void) {
	const logoutMutation = useMutation({
		mutationFn: AuthModel.requestLogout,
		onSuccess,
	})
	if (logoutMutation.isError) toast.error(logoutMutation.error.message)
	return { logoutMutation }
}

export default useLogout
