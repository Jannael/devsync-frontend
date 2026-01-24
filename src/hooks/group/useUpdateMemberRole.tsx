import { useMutation } from '@tanstack/react-query'
import GroupModel from '../../service/api/models/group/model'

function useUpdateMemberRole(onSuccess: () => void) {
	const updateMemberRole = useMutation({
		mutationFn: GroupModel.memberUpdateRole,
		onSuccess,
	})

	return { updateMemberRole }
}

export default useUpdateMemberRole
