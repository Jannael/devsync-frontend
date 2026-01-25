import { useMutation } from '@tanstack/react-query'
import groupModel from '../../service/api/models/group/model'
import { toast } from 'sonner'

function useCreateGroup(onSuccess: () => void) {
	const createGroup = useMutation({
		mutationFn: groupModel.create,
		onSuccess,
	})
	if (createGroup.isError) toast.error(createGroup.error.message)
	return { createGroup }
}

export default useCreateGroup
