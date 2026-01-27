import { useMutation, useQueryClient } from '@tanstack/react-query'
import TaskModel from '../../service/api/models/task/model'

function useUpdateTask() {
	const queryClient = useQueryClient()

	const updateTask = useMutation({
		mutationFn: TaskModel.update,
		onSuccess: (_, data) => {
			queryClient.invalidateQueries({ queryKey: [data.taskId] })
		},
	})

	return { updateTask }
}

export default useUpdateTask
