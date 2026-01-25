import { useMutation } from '@tanstack/react-query'
import UserModel from '../../service/api/models/user/model'

function useAddGroup(onSuccess: () => void) {
	const addGroup = useMutation({
		mutationFn: UserModel.addGroup,
		onSuccess,
	})

	return { addGroup }
}

export default useAddGroup
