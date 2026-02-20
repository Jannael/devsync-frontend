import { useRef, useState } from 'react'
import useMainStore from '../../store/Main.store'
import useTaskStore from '../../store/Task.store'
import { useGetMembers } from '../query/member/useGetMembers.query'
import { useGetTask } from '../query/task/useGetTask.query'

function useUsersMenu() {
	const isSolution = useTaskStore((state) => state.isSolution)
	const currentGroup = useMainStore((state) => state.currentGroup)
	const currentTask = useMainStore((state) => state.currentTask)
	const setAssignedUser = useTaskStore((state) => state.setAssignedUser)

	const { data: membersData } = useGetMembers(currentGroup as string)
	const { data: task } = useGetTask({
		_id: currentTask as string,
		groupId: currentGroup as string,
	})

	const [members, setMembers] = useState<string[]>(
		isSolution && task?.user ? task?.user : [],
	)
	const selectRef = useRef<HTMLSelectElement>(null)
	const onRemoveMember = (member: string) => {
		setMembers((prev) => prev.filter((m) => m !== member))
		setAssignedUser(members)
	}

	const handleAddMember = () => {
		const user = selectRef.current?.value
		if (user && !members.includes(user)) {
			setMembers((prev) => [...prev, user])
		}
	}
	return {
		handleAddMember,
		selectRef,
		membersData,
		isSolution,
    task,
    members,
    onRemoveMember
	}
}
export default useUsersMenu