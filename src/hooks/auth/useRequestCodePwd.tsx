import { useMutation } from '@tanstack/react-query'
import authModel from '../../service/api/models/auth/model'

function useRequestCodePwd(onSuccess: () => void) {
	const passwordRequestCode = useMutation({
		mutationFn: authModel.passwordRequestCode,
		onSuccess,
	})
	return { passwordRequestCode }
}

export default useRequestCodePwd
