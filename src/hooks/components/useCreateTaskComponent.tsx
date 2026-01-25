import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { routesConst } from '../../routes.constants'
import TaskValidation from '../../service/TaskValidation'
import useGetGroup from '../group/useGetGroup'
import useCreateTask from '../task/useCreateTask'

// here its the only place where we are allow to use the toast because the P-error element does not look good so i used the toast for validations errors as well

function useCreateTaskComponent() {
	const [users, setUsers] = useState<string[]>()
	const [features, setFeatures] = useState<string[]>()

	const [searchParams] = useSearchParams()
	const groupId = searchParams.get('groupId') || null

	const { createTask } = useCreateTask(() => {
		window.location.href = `${routesConst.group}?groupId=${groupId}`
	})
	const { group } = useGetGroup({ groupId })

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries())

		const isValid = TaskValidation({
			groupId,
			user: users || undefined,
			name: data.name?.toString(),
			code: data.code
				? {
						language: 'js',
						content: data.code,
					}
				: undefined,
			feature: features,
			description: data.description?.toString(),
			isComplete: Boolean(data.isComplete?.toString()),
			priority: Number(data.priority?.toString()),
		})
		if (typeof isValid === 'string') {
			toast.error(isValid)
			return
		}

		createTask.mutate(isValid)
	}

	return {
		users,
		setUsers,
		group,
		createTask,
		handleSubmit,
		setFeatures,
		features,
	}
}

export default useCreateTaskComponent
