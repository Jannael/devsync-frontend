import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import queryKeys from '../../queryKeys'
import TaskModel from '../../service/api/models/task/model'

function useDeleteTask() {
	const queryClient = useQueryClient()
	const deleteTask = useMutation({
		mutationFn: TaskModel.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.taskList] })
		},
	})
	if (deleteTask.isError) toast.error(deleteTask.error.message)
	return { deleteTask }
}

export default useDeleteTask
