import { useMutation } from '@tanstack/react-query'
import authModel from '../../service/api/models/auth/model'

function useRefreshTokenCode(onSuccess: () => void) {
	const requestRefreshTokenCode = useMutation({
		mutationFn: authModel.requestRefreshTokenCode,
		onSuccess,
	})
	return { requestRefreshTokenCode }
}

export default useRefreshTokenCode
