import { useMutation } from '@tanstack/react-query'
import authModel from '../service/api/models/auth/model'

function useVerifyCode(onSuccess: () => void) {
	const verifyCode = useMutation({
		mutationFn: authModel.verifyCode,
		onSuccess
	})
	return { verifyCode }
}

export default useVerifyCode
