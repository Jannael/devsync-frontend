import { useRef, useState } from 'react'
import useMainStore from '../../store/Main.store'
import useTaskStore from '../../store/Task.store'
import { useGetMembers } from '../query/member/useGetMembers.query'
import { useGetTask } from '../query/task/useGetTask.query'

function useUsersMenu() {
	const isSolution = useTaskStore((state) => state.isSolution)
	const isEdit = useTaskStore((state) => state.edit)
	const isCreate = useTaskStore((state) => state.create)
	const showInput =
		(isSolution && isEdit) || // only show input when you update a solution
		(isEdit && !isSolution) || // only show input when you update a task
		(isCreate && !isSolution) // only show input when you create a task

	const showMembersFromTask =
		(isSolution && isEdit) || // update a solution gets the assigned users from the task
		(isEdit && !isSolution) || // update a task gets the assigned users from the task
		(isCreate && isSolution) // create a solution gets the assigned users from the task

	const currentGroup = useMainStore((state) => state.currentGroup)
	const currentTask = useMainStore((state) => state.currentTask)
	const setAssignedUser = useTaskStore((state) => state.setAssignedUser)
	const assignedUser = useTaskStore((state) => state.assignedUser)

	const { data: membersData } = useGetMembers(currentGroup as string)
	const { data: task } = useGetTask({
		_id: currentTask as string,
		groupId: currentGroup as string,
	})
	const [members, setMembers] = useState<string[]>(
		showMembersFromTask && task?.user ? task?.user : [],
	)

	const selectRef = useRef<HTMLSelectElement>(null)

	const onRemoveMember = (member: string) => {
		const newMembers = members.filter((m) => m !== member)
		setMembers(newMembers)
		setAssignedUser(newMembers)
	}

	const handleAddMember = () => {
		const input = selectRef.current?.value
		if (input && !members.includes(input)) {
			const newMembers = [...members, input]
			setMembers(newMembers)
			setAssignedUser(newMembers)
		}
	}

	return {
		handleAddMember,
		selectRef,
		membersData,
		showInput,
		task,
		members: showInput ? assignedUser : members,
		onRemoveMember,
	}
}
export default useUsersMenu
