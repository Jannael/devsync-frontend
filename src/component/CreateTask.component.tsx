import { useState } from 'react'
import { useGetTask } from '../hook/query/task/useGetTask.query'
import useMainStore from '../store/Main.store'
import useTaskStore from '../store/Task.store'
import Button from './ui/Button.ui'
import FeaturesInput from './ui/FeaturesInput.ui'
import Form from './ui/Form.ui'
import Header from './ui/Header.ui'
import Input from './ui/Input.ui'
import Label from './ui/Label.ui'
import Textarea from './ui/Textarea.ui'

function CreateTask() {
	const setCreate = useTaskStore((state) => state.setCreate)
	const isSolution = useTaskStore((state) => state.isSolution)
	const currentTask = useMainStore((state) => state.currentTask)
	const currentGroup = useMainStore((state) => state.currentGroup)

	const { data: task } = useGetTask({
		_id: currentTask ?? '',
		groupId: currentGroup ?? '',
	})

	const [features, setFeatures] = useState<string[]>([])

	return (
		<section className='flex-3 h-full p-3' id='Task'>
			<Form
				className='h-full bg-main flex flex-col items-center
			border-primary border rounded-lg gap-6 overflow-y-auto max-w-none p-5 px-6'
				onSubmit={() => {}}
				padding={false}
			>
				<Header className='w-full justify-between flex mb-0 sm:mb-0 flex-col sm:flex-row gap-4 sm:gap-0'>
					<div className='flex flex-col gap-2 flex-1 mr-0 sm:mr-6 w-full'>
						{!isSolution && (
							<>
								<Label id='name'>Task Name</Label>
								<Input
									id='name'
									name='name'
									placeholder='chore: update dependencies'
									type='text'
								/>
							</>
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
					<div className='flex-2 flex flex-col gap-3'>
						<Label id='code'>Code</Label>
						<Textarea
							id='code'
							name='code'
							placeholder='feat: add login page'
						/>
					</div>
				</div>
			</Form>
		</section>
	)
}

export default CreateTask
