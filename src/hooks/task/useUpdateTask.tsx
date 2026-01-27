import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import queryKeys from '../../queryKeys'
import TaskModel from '../../service/api/models/task/model'

function useUpdateTask() {
	const queryClient = useQueryClient()

	const updateTask = useMutation({
		mutationFn: TaskModel.update,
		onSuccess: (_, data) => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.taskDetail, data.taskId] })
			queryClient.invalidateQueries({ queryKey: [queryKeys.taskList] })
		},
	})

	if (updateTask.isError) toast.error(updateTask.error.message)

	return { updateTask }
}

export default useUpdateTask
