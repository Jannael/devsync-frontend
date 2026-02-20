import { useState } from 'react'
import { useCreateTask } from '../mutation/task/useCreateTask.mutation'
import useTaskStore from '../../store/Task.store'
import useMainStore from '../../store/Main.store'
import { useGetTask } from '../query/task/useGetTask.query'
import { SolutionValidator } from '../../validator/schemas/Solution.schema'
import { TaskValidator } from '../../validator/schemas/Task.schema'
import { useCreateSolution } from '../mutation/solution/useCreateSolution.mutation'
import { toast } from 'sonner'
import GetFormData from './../../utils/GetFormData.utils'

function useCreateTaskComponent() {
	const setCreate = useTaskStore((state) => state.setCreate)
	const isSolution = useTaskStore((state) => state.isSolution)
  const assignedUser = useTaskStore((state) => state.assignedUser)
	const currentTask = useMainStore((state) => state.currentTask)
	const currentGroup = useMainStore((state) => state.currentGroup)
	const createTask = useCreateTask()
	const createSolution = useCreateSolution()

	const { data: task } = useGetTask({
		_id: currentTask ?? '',
		groupId: currentGroup ?? '',
	})

	const [features, setFeatures] = useState<string[]>(task?.feature ?? [])

	const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = GetFormData(e)
		const taskId = currentTask ?? ''

		const data = {
			name: formData.name,
			description: formData.description,
			code: {
				language: formData.language,
				content: formData.code,
			},
			feature: features,
			user: assignedUser,
			priority: formData.priority,
		}

		try {
			if (isSolution) {
				SolutionValidator({
					data: { ...data, _id: taskId },
					groupId: currentGroup ?? '',
				})

				await createSolution.mutateAsync({
					data: { ...data, _id: taskId },
					groupId: currentGroup ?? '',
				})
			} else {
				TaskValidator({
					groupId: currentGroup ?? '',
					data: {
						...data,
						isComplete: false,
						priority: Number(formData.priority),
					},
				})

				await createTask.mutateAsync({
					groupId: currentGroup ?? '',
					data: {
						...data,
						isComplete: false,
						priority: Number(formData.priority),
					},
				})
			}
		} catch (e) {
			toast.error((e as Error).message)
		}
	}

	return {
		handleCreate,
		setFeatures,
		features,
		isSolution,
		task,
		setCreate,
	}
}

export default useCreateTaskComponent