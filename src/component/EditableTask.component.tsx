import { useGetSolution } from '../hook/query/solution/useGetSolution.query'
import { useGetTask } from '../hook/query/task/useGetTask.query'
import useMainStore from '../store/Main.store'
import useTaskStore from '../store/Task.store'
import Button from './ui/Button.ui'
import Header from './ui/Header.ui'
import Input from './ui/Input.ui'
import Label from './ui/Label.ui'

function EditableTask() {
	const isSolution = useTaskStore((state) => state.isSolution)
	const setEdit = useTaskStore((state) => state.setEdit)
	const currentTask = useMainStore((state) => state.currentTask)
	const currentGroup = useMainStore((state) => state.currentGroup)

	const { data: task } = useGetTask({
		_id: currentTask ?? '',
		groupId: currentGroup ?? '',
	})

	const { data: solution } = useGetSolution({
		_id: currentTask ?? '',
		groupId: currentGroup ?? '',
	})

	const name = task?.name
	const description = isSolution ? solution?.description : task?.description
	const features = isSolution ? solution?.feature : task?.feature
	const code = isSolution ? solution?.code : task?.code

	return (
		<section className='flex-3 h-full p-3' id='Task'>
			<article
				className='h-full bg-main flex flex-col items-center
			border-primary border py-5 rounded-lg px-3 gap-6 overflow-y-auto'
			>
				<Header>
					<div className='flex flex-col gap-2 flex-1 mr-5'>
						<Label id='name'>Task name</Label>
						<Input
							id='name'
							name='name'
							placeholder='chore: do...'
							type='text'
							value={name}
						/>
					</div>
					<div className='flex gap-3 h-full items-end'>
						<Button
							block={false}
							onClick={() => setEdit(false)}
							type='button'
							variant='destructive'
						>
							Cancel
						</Button>
						<Button block={false} type='button'>
							Save
						</Button>
					</div>
				</Header>
			</article>
		</section>
	)
}

export default EditableTask
