import { useMutation } from '@tanstack/react-query'
import authModel from '../../service/api/models/auth/model'

function useRequestRefreshToken(onSuccess: () => void) {
	const requestRefreshToken = useMutation({
		mutationFn: authModel.requestRefreshToken,
		onSuccess,
	})
	return { requestRefreshToken }
}

export default useRequestRefreshToken
