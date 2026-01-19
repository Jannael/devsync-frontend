import { useMutation } from '@tanstack/react-query'
import authModel from '../../service/api/models/auth/model'

function useRequestCode(onSuccess: () => void) {
	const requestCode = useMutation({
		mutationFn: authModel.requestCode,
		onSuccess,
	})
	return { requestCode }
}

export default useRequestCode
