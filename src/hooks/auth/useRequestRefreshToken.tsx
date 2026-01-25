import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import authModel from '../../service/api/models/auth/model'

function useRequestRefreshToken(onSuccess: () => void) {
	const requestRefreshToken = useMutation({
		mutationFn: authModel.requestRefreshToken,
		onSuccess,
	})
	if (requestRefreshToken.isError)
		toast.error(requestRefreshToken.error.message)
	return { requestRefreshToken }
}

export default useRequestRefreshToken
