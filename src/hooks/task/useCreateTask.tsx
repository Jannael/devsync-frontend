import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import taskModel from './../../service/api/models/task/model'

function useCreateTask(onSuccess: () => void) {
	const createTask = useMutation({
		mutationFn: taskModel.create,
		onSuccess,
	})
	if (createTask.isError) toast.error(createTask.error.message)
	return { createTask }
}

export default useCreateTask
