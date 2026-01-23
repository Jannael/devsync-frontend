import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { routesConst } from '../../routes.constants'
import ColorValidator from '../../service/HexColorValidation'
import urlValidator from '../../service/UrlValidator'
import useDeleteGroup from '../group/useDeleteGroup'
import useGetGroup from '../group/useGetGroup'
import useRemoveMember from '../group/useRemoveMember'
import useUpdateGroup from '../group/useUpdateGroup'
import useRemoveGroup from '../user/useRemoveGroup'

function useGroupInfoComponent() {
	const [searchParams] = useSearchParams()
	const queryClient = useQueryClient()
	const groupId = searchParams.get('groupId')

	const { group } = useGetGroup({ groupId })
	const data = group.data?.result
	const { removeMember } = useRemoveMember(() => {
		queryClient.invalidateQueries({ queryKey: [groupId] })
	})
	const { updateGroup } = useUpdateGroup(() => {
		queryClient.invalidateQueries({ queryKey: [groupId] })
	})
	const { deleteGroup } = useDeleteGroup(() => {
		queryClient.invalidateQueries({ queryKey: [groupId] })
		window.location.href = routesConst.main
	})
	const { removeGroup } = useRemoveGroup(() => {
		queryClient.invalidateQueries({ queryKey: [groupId] })
		window.location.href = routesConst.main
	})

	const handleColorUpdate = (value: string | undefined) => {
		if (!value) return
		const isValid = ColorValidator({ color: value })
		if (typeof isValid === 'string') return toast.error(isValid)

		updateGroup.mutate({
			_id: data?._id,
			data: {
				color: value,
				name: undefined,
				repository: undefined,
			},
		})
	}

	const handleRepositoryUpdate = (value: string | undefined) => {
		if (!value) return
		const isValid = urlValidator({ repository: value })
		if (typeof isValid === 'string') return toast.error(isValid)

		updateGroup.mutate({
			_id: data?._id,
			data: {
				repository: value,
				name: undefined,
				color: undefined,
			},
		})
	}

	const handleRemoveMember = (account: string) => {
		if (groupId === null) return

		removeMember.mutate({
			_id: groupId,
			account: account,
		})
	}

	const handleDeleteGroup = () => {
		if (groupId === null) return

		deleteGroup.mutate({
			_id: groupId,
		})
	}

	const handleRemoveGroup = () => {
		if (groupId === null) return

		removeGroup.mutate({
			_id: groupId,
		})
	}

	if (group.isError) toast.error(group.error.message)
	if (removeMember.isError) toast.error(removeMember.error.message)
	if (removeMember.isError) toast.error(removeMember.error.message)
	if (deleteGroup.isError) toast.error(deleteGroup.error.message)
	if (removeGroup.isError) toast.error(removeGroup.error.message)

	return {
		data,
		handleColorUpdate,
		handleRepositoryUpdate,
		handleRemoveMember,
		handleDeleteGroup,
		handleRemoveGroup
	}
}

export default useGroupInfoComponent
