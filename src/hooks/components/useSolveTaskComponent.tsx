import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import useSolveTask from '../../hooks/solveTask/useSolveTask'
import { routesConst } from '../../routes.constants'
import SolveTaskValidation from '../../service/SolveTaskValidation'

function useSolveTaskComponent() {
	const [searchParams] = useSearchParams()
	const [error, setError] = useState<string | null>(null)
	const [feature, setFeature] = useState<string[] | undefined>()

	const taskId = searchParams.get('taskId')
	const groupId = searchParams.get('groupId')
	const { solveTask } = useSolveTask(() => {
		window.location.href = `${routesConst.group}?groupId=${groupId}`
	})

	if (solveTask.isError) toast.error(solveTask.error.message)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(null)
		if (!taskId || !groupId) return

		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries())
		const solution = {
			taskId,
			groupId,
			feature,
			code: data.code
				? {
						language: 'js',
						content: data.code.toString(),
					}
				: undefined,
			description: data.description?.toString(),
		}

		const isValid = SolveTaskValidation(solution)

		if (typeof isValid === 'string') return setError(isValid)

		solveTask.mutate({
			taskId,
			groupId,
			data: {
				code: solution.code,
				feature,
				description: solution.description,
			},
		})
	}

	return { handleSubmit, taskId, error, feature, setFeature, solveTask }
}

export default useSolveTaskComponent
