import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import authModel from '../../service/api/models/auth/model'

function useRequestCode(onSuccess: () => void) {
	const requestCode = useMutation({
		mutationFn: authModel.requestCode,
		onSuccess,
	})
	if (requestCode.isError) toast.error(requestCode.error.message)
	return { requestCode }
}

export default useRequestCode
