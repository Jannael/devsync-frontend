import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import authModel from '../../service/api/models/auth/model'

function useRefreshTokenCode(onSuccess: () => void) {
	const requestRefreshTokenCode = useMutation({
		mutationFn: authModel.requestRefreshTokenCode,
		onSuccess,
	})
	if (requestRefreshTokenCode.isError)
		toast.error(requestRefreshTokenCode.error.message)
	return { requestRefreshTokenCode }
}

export default useRefreshTokenCode
