import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import UserModel from '../../service/api/models/user/model'

function useRemoveGroup(onSuccess: () => void) {
	const removeGroup = useMutation({
		mutationFn: UserModel.deleteGroup,
		onSuccess,
	})
	if (removeGroup.isError) toast.error(removeGroup.error.message)
	return { removeGroup }
}

export default useRemoveGroup
