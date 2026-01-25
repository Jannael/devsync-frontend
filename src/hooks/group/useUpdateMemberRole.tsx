import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import GroupModel from '../../service/api/models/group/model'

function useUpdateMemberRole(onSuccess: () => void) {
	const updateMemberRole = useMutation({
		mutationFn: GroupModel.memberUpdateRole,
		onSuccess,
	})
	if (updateMemberRole.isError) toast.error(updateMemberRole.error.message)
	return { updateMemberRole }
}

export default useUpdateMemberRole
