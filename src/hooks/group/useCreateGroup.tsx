import { useMutation } from '@tanstack/react-query'
import groupModel from '../../service/api/models/group/model'

function useCreateGroup(onSuccess: () => void) {
	const createGroup = useMutation({
		mutationFn: groupModel.create,
		onSuccess,
	})
	return { createGroup }
}

export default useCreateGroup
