import useCreateTaskComponent from '../hook/component/useCreateTask.hook'
import Button from './ui/Button.ui'
import CodeInput from './ui/CodeInput.ui'
import FeaturesInput from './ui/FeaturesInput.ui'
import Form from './ui/Form.ui'
import Header from './ui/Header.ui'
import Input from './ui/Input.ui'
import Label from './ui/Label.ui'
import Select from './ui/Select.ui'
import Textarea from './ui/Textarea.ui'

function CreateTask() {
	const {
		handleCreate,
		setFeatures,
		features,
		isSolution,
		task,
		setCreate,
		blockSave,
	} = useCreateTaskComponent()

	return (
		<section className='flex-3 h-full p-3' id='Task'>
			<Form
				className='h-full bg-main flex flex-col items-center
			 rounded-lg gap-6 overflow-y-auto w-full p-5 px-6'
				onSubmit={handleCreate}
				padding={false}
			>
				<Header className='w-full justify-between flex mb-0 flex-col md:flex-row gap-4 md:gap-0'>
					<div className='flex flex-col gap-2 flex-1 w-full'>
						{!isSolution && (
							<div className='flex flex-col sm:flex-row gap-4 w-full'>
								<div className='flex-1'>
									<Label id='name'>Task Name</Label>
									<Input
										id='name'
										name='name'
										placeholder='chore: update dependencies'
										type='text'
									/>
								</div>
								<div className='w-full sm:w-32 flex flex-col gap-1'>
									<Label id='priority'>Priority</Label>
									<Select id='priority' onChange={() => {}} value='0'>
										{[...Array(11)].map((_, i) => (
											<option key={i as number} value={i}>
												{i}
											</option>
										))}
									</Select>
								</div>
							</div>
						)}
						{isSolution && <h1>{task?.name}</h1>}
					</div>
					<div className='flex gap-3 items-end w-full md:w-auto'>
						<Button
							block={blockSave}
							className='flex-1 sm:flex-none'
							onClick={() => {
								setCreate(false)
							}}
							type='button'
							variant='destructive'
						>
							Cancel
						</Button>
						<Button block={blockSave} className='flex-1' type='submit'>
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
					/>
				</div>
				<div className='w-full flex-none lg:flex-1 flex flex-col lg:flex-row gap-5'>
					<FeaturesInput features={features} setFeatures={setFeatures} />
					<CodeInput />
				</div>
			</Form>
		</section>
	)
}

export default CreateTask
