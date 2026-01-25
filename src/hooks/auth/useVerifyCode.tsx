import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import authModel from '../../service/api/models/auth/model'

function useVerifyCode(onSuccess: () => void) {
	const verifyCode = useMutation({
		mutationFn: authModel.verifyCode,
		onSuccess,
	})
	if (verifyCode.isError) toast.error(verifyCode.error.message)
	return { verifyCode }
}

export default useVerifyCode
