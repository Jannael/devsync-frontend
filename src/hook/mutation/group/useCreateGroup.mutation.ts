import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import GroupService from '../../../service/Group.service'

export const useCreateGroup = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (data: {
			name: string
			color: string
			repository?: string | null
		}) => GroupService.Create({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: GROUP_KEYS.ALL })
			queryClient.invalidateQueries({ queryKey: USER_KEYS.GROUPS })
		},
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
