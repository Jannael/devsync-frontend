import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import GroupModel from '../../service/api/models/group/model'

function useUpdateGroup(onSuccess: () => void) {
	const updateGroup = useMutation({
		mutationFn: GroupModel.update,
		onSuccess,
	})
	if (updateGroup.isError) toast.error(updateGroup.error.message)
	return { updateGroup }
}

export default useUpdateGroup
