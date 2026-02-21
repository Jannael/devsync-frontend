import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import GroupService from '../../../service/Group.service'

export const useUpdateGroup = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (args: {
			groupId: string
			data: { name?: string; color?: string; repository?: string | null }
		}) => GroupService.Update(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: GROUP_KEYS.DETAIL(variables.groupId),
			})
			queryClient.invalidateQueries({ queryKey: GROUP_KEYS.ALL })
		},
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
