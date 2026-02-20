import { useState } from 'react'
import { toast } from 'sonner'
import { useCreateSolution } from '../hook/mutation/solution/useCreateSolution.mutation'
import { useCreateTask } from '../hook/mutation/task/useCreateTask.mutation'
import { useGetTask } from '../hook/query/task/useGetTask.query'
import useMainStore from '../store/Main.store'
import useTaskStore from '../store/Task.store'
import GetFormData from '../utils/GetFormData.utils'
import { SolutionValidator } from '../validator/schemas/Solution.schema'
import { TaskValidator } from '../validator/schemas/Task.schema'
import Button from './ui/Button.ui'
import FeaturesInput from './ui/FeaturesInput.ui'
import Form from './ui/Form.ui'
import Header from './ui/Header.ui'
import Input from './ui/Input.ui'
import Label from './ui/Label.ui'
import Select from './ui/Select.ui'
import Textarea from './ui/Textarea.ui'

const assignedUser = ['orlandojannael@gmail.com']

function CreateTask() {
	const setCreate = useTaskStore((state) => state.setCreate)
	const isSolution = useTaskStore((state) => state.isSolution)
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

	return (
		<section className='flex-3 h-full p-3' id='Task'>
			<Form
				className='h-full bg-main flex flex-col items-center
			border-primary border rounded-lg gap-6 overflow-y-auto max-w-none p-5 px-6'
				onSubmit={handleCreate}
				padding={false}
			>
				<Header className='w-full justify-between flex mb-0 sm:mb-0 flex-col sm:flex-row gap-4 sm:gap-0'>
					<div className='flex flex-col gap-2 flex-1 mr-0 sm:mr-6 w-full'>
						{!isSolution && (
							<div className='flex flex-col md:flex-row gap-4 w-full'>
								<div className='flex-1'>
									<Label id='name'>Task Name</Label>
									<Input
										id='name'
										name='name'
										placeholder='chore: update dependencies'
										type='text'
									/>
								</div>
								{!isSolution && <div className='w-full md:w-32 flex flex-col gap-1'>
									<Label id='priority'>Priority</Label>
									<Select id='priority' onChange={() => {}} value='0'>
										{[...Array(11)].map((_, i) => (
											<option key={i as number} value={i}>
												{i}
											</option>
										))}
									</Select>
								</div>}
							</div>
						)}
						{isSolution && <h1>{task?.name}</h1>}
					</div>
					<div className='flex gap-3 h-full items-end w-full sm:w-auto'>
						<Button
							block={false}
							className='flex-1 sm:flex-none'
							onClick={() => {
								setCreate(false)
							}}
							type='button'
							variant='destructive'
						>
							Cancel
						</Button>
						<Button block={false} className='flex-1' type='submit'>
							Save
						</Button>
					</div>
				</Header>
				<div className='w-full flex flex-col gap-3 flex-1'>
					<Label id='description'>Description</Label>
					<Textarea
						id='description'
						name='description'
						placeholder='Task description'
					/>
				</div>
				<div className='w-full flex-1 flex flex-col md:flex-row gap-5'>
					<FeaturesInput features={features} setFeatures={setFeatures} />
					<CodeInput />
				</div>
			</Form>
		</section>
	)
}

function CodeInput() {
	return (
		<div className='flex-2 flex flex-col gap-3'>
			<div className='w-full flex justify-between items-center'>
				<Label id='code'>Code</Label>
				<Select id='language' onChange={() => {}} value='typescript'>
					<option value='typescript'>TypeScript</option>
					<option value='javascript'>JavaScript</option>
					<option value='python'>Python</option>
					<option value='java'>Java</option>
					<option value='c'>C</option>
				</Select>
			</div>
			<Textarea id='code' name='code' placeholder='feat: add login page' />
		</div>
	)
}

export default CreateTask
