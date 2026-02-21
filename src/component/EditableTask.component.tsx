import { useState } from 'react'
import { useUpdateSolution } from '../hook/mutation/solution/useUpdateSolution.mutation'
import { useUpdateTask } from '../hook/mutation/task/useUpdateTask.mutation'
import { useGetSolution } from '../hook/query/solution/useGetSolution.query'
import { useGetTask } from '../hook/query/task/useGetTask.query'
import useMainStore from '../store/Main.store'
import useTaskStore from '../store/Task.store'
import GetFormData from '../utils/GetFormData.utils'
import Button from './ui/Button.ui'
import CodeInput from './ui/CodeInput.ui'
import FeaturesInput from './ui/FeaturesInput.ui'
import Form from './ui/Form.ui'
import Header from './ui/Header.ui'
import Input from './ui/Input.ui'
import Label from './ui/Label.ui'
import Select from './ui/Select.ui'
import Textarea from './ui/Textarea.ui'
import { toast } from 'sonner'

function EditableTask() {
	const isSolution = useTaskStore((state) => state.isSolution)
	const assignedUsers = useTaskStore((state) => state.assignedUser)
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

	const [features, setFeatures] = useState<string[]>(task?.feature ?? [])
	const updateTaskMutation = useUpdateTask()
	const updateSolutionMutation = useUpdateSolution()

	const name = task?.name
	const description = isSolution ? solution?.description : task?.description
	const code = isSolution ? solution?.code : task?.code

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		const updateData = {
			feature: features,
			user: assignedUsers,
			code: {
				content: data.code,
				language: data.language,
			},
			description: data.description,
			name: data.name,
			priority: data.priority,
		}

		try {
			if (isSolution) {
				updateSolutionMutation.mutate({
					_id: currentTask ?? '',
					groupId: currentGroup ?? '',
					data: updateData,
				})
			} else {
				updateTaskMutation.mutate({
					_id: currentTask ?? '',
					groupId: currentGroup ?? '',
					data: { ...updateData, priority: Number(data.priority) },
				})
			}
			setEdit(false)
		} catch (e) {
			toast.error((e as Error).message)
		}
	}

	return (
		<section className='flex-3 h-full p-3' id='Task'>
			<Form
				className='h-full bg-main flex flex-col items-center
			 rounded-lg gap-6 overflow-y-auto max-w-none p-5 px-6'
				onSubmit={handleUpdate}
				padding={false}
			>
				<Header>
					<div className='flex flex-col gap-2 flex-1 mr-5'>
						{!isSolution && (
							<div className='flex flex-col md:flex-row gap-4 w-full'>
								<div className='flex-1'>
									<Label id='name'>Task Name</Label>
									<Input
										id='name'
										name='name'
										placeholder='chore: update dependencies'
										type='text'
										value={name}
									/>
								</div>
								<div className='w-full md:w-32 flex flex-col gap-1'>
									<Label id='priority'>Priority</Label>
									<Select
										id='priority'
										onChange={() => {}}
										value={task?.priority?.toString() || '0'}
									>
										{[...Array(11)].map((_, i) => (
											<option key={i as number} value={i}>
												{i}
											</option>
										))}
									</Select>
								</div>
							</div>
						)}
						{isSolution && <h1>{name}</h1>}
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
						<Button block={false} type='submit'>
							Save
						</Button>
					</div>
				</Header>
				<div className='w-full flex flex-col gap-3 flex-1'>
					<Label id='description'>Description</Label>
					<Textarea
						id='description'
						name='description'
						placeholder='I came up with this solution...'
						value={description}
					/>
				</div>
				<div className='w-full flex-1 flex flex-col md:flex-row gap-5'>
					<FeaturesInput features={features} setFeatures={setFeatures} />
					<CodeInput content={code?.content} language={code?.language} />
				</div>
			</Form>
		</section>
	)
}

export default EditableTask
