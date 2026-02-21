import { useRef } from 'react'
import useMainStore from '../../store/Main.store'
import useTaskStore from '../../store/Task.store'
import { useGetMembers } from '../query/member/useGetMembers.query'

function useUsersMenu() {
	const isSolution = useTaskStore((state) => state.isSolution)
	const isEdit = useTaskStore((state) => state.edit)
	const isCreate = useTaskStore((state) => state.create)
	const showInput =
		(isEdit && !isSolution) || // only show input when you update a task
		(isCreate && !isSolution) // only show input when you create a task

	const currentGroup = useMainStore((state) => state.currentGroup)
	const setAssignedUser = useTaskStore((state) => state.setAssignedUser)
	const assignedUser = useTaskStore((state) => state.assignedUser)

	const { data: membersData } = useGetMembers(currentGroup as string)

	const selectRef = useRef<HTMLSelectElement>(null)

	const onRemoveMember = (member: string) => {
		const newMembers = assignedUser.filter((m) => m !== member)
		setAssignedUser(newMembers)
	}

	const handleAddMember = () => {
		const input = selectRef.current?.value
		if (input && !assignedUser.includes(input)) {
			const newMembers = [...assignedUser, input]
			setAssignedUser(newMembers)
		}
	}

	return {
		handleAddMember,
		selectRef,
		membersData,
		showInput,
		members: assignedUser,
		onRemoveMember,
	}
}

export default useUsersMenu
