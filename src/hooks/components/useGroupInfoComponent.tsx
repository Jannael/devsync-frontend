import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { routesConst } from '../../routes.constants'
import ColorValidator from '../../service/HexColorValidation'
import urlValidator from '../../service/UrlValidator'
import useDeleteGroup from '../group/useDeleteGroup'
import useGetGroup from '../group/useGetGroup'
import useRemoveMember from '../group/useRemoveMember'
import useUpdateGroup from '../group/useUpdateGroup'
import useUpdateMemberRole from '../group/useUpdateMemberRole'
import useInviteUser from '../user/useInviteUser'
import useRemoveGroup from '../user/useRemoveGroup'

// same case as createTask: here its the only place where we are allow to use the toast because the P-error element does not look good so i used the toast for validations errors as well

function useMutations({
	groupId,
	setIsOpen,
}: {
	groupId: string
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const queryClient = useQueryClient()
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
	const { inviteUser } = useInviteUser(() => {
		setIsOpen(false)
		queryClient.invalidateQueries({ queryKey: [groupId] })
	})
	const { updateMemberRole } = useUpdateMemberRole(() => {
		queryClient.invalidateQueries({ queryKey: [groupId] })
	})

	return {
		removeMember,
		deleteGroup,
		removeGroup,
		updateGroup,
		inviteUser,
		updateMemberRole,
		data,
	}
}

function useHandlers({
	groupId,
	updateGroup,
	data,
	removeMember,
	deleteGroup,
	removeGroup,
	inviteUser,
	updateMemberRole,
}: {
	groupId: string
	updateGroup: ReturnType<typeof useUpdateGroup>['updateGroup']
	data: ReturnType<typeof useGetGroup>['group']['data']
	removeMember: ReturnType<typeof useRemoveMember>['removeMember']
	deleteGroup: ReturnType<typeof useDeleteGroup>['deleteGroup']
	removeGroup: ReturnType<typeof useRemoveGroup>['removeGroup']
	inviteUser: ReturnType<typeof useInviteUser>['inviteUser']
	updateMemberRole: ReturnType<typeof useUpdateMemberRole>['updateMemberRole']
}) {
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

	const handleNameUpdate = (value: string | undefined) => {
		if (!value) return

		updateGroup.mutate({
			_id: data?._id,
			data: {
				repository: undefined,
				name: value,
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

	const handleInviteUser = ({
		account,
		role,
	}: {
		account: string
		role: string
	}) => {
		if (groupId === null) return

		inviteUser.mutate({
			account,
			role,
			_id: groupId,
		})
	}

	const handleUpdateMemberRole = ({
		account,
		role,
	}: {
		account: string
		role: string
	}) => {
		if (groupId === null) return

		updateMemberRole.mutate({
			_id: groupId,
			account,
			role,
		})
	}

	return {
		handleColorUpdate,
		handleRepositoryUpdate,
		handleRemoveMember,
		handleDeleteGroup,
		handleRemoveGroup,
		handleInviteUser,
		handleUpdateMemberRole,
		handleNameUpdate,
	}
}

function useGroupInfoComponent() {
	const [searchParams] = useSearchParams()
	const groupId = searchParams.get('groupId')
	const [isOpen, setIsOpen] = useState(false)

	const {
		removeMember,
		deleteGroup,
		removeGroup,
		updateGroup,
		inviteUser,
		updateMemberRole,
		data,
	} = useMutations({ groupId: groupId!, setIsOpen })

	const {
		handleColorUpdate,
		handleRepositoryUpdate,
		handleRemoveMember,
		handleDeleteGroup,
		handleRemoveGroup,
		handleInviteUser,
		handleUpdateMemberRole,
		handleNameUpdate,
	} = useHandlers({
		groupId: groupId!,
		updateGroup,
		data,
		removeMember,
		deleteGroup,
		removeGroup,
		inviteUser,
		updateMemberRole,
	})

	return {
		data,
		handleColorUpdate,
		handleRepositoryUpdate,
		handleRemoveMember,
		handleDeleteGroup,
		handleRemoveGroup,
		handleInviteUser,
		handleUpdateMemberRole,
		handleNameUpdate,
		isOpen,
		setIsOpen,
	}
}

export default useGroupInfoComponent
