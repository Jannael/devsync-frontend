import { useMutation } from '@tanstack/react-query'
import taskModel from './../../service/api/models/task/model'

function useCreateTask(onSuccess: () => void) {
	const createTask = useMutation({
		mutationFn: taskModel.create,
		onSuccess,
	})
	return { createTask }
}

export default useCreateTask
