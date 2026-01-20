import { Toaster } from 'sonner'
import CreateTaskLeftSide from '../../components/task/CreateTaskLeftSide'
import CreateTaskRightSide from '../../components/task/CreateTaskRightSIde'
import Form from '../../components/ui/Form'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useCreateTaskComponent from '../../hooks/components/useCreateTaskComponent'

function CreateTask() {
	const {
		users,
		setUsers,
		group,
		createTask,
		handleSubmit,
		setFeatures,
		features,
	} = useCreateTaskComponent()

	return (
		<Page className='flex p-4 justify-center items-center'>
			<Toaster />
			<Form
				className='flex flex-row flex-wrap w-full max-w-7xl'
				onSubmit={handleSubmit}
			>
				<Title className='w-full'>Create Task</Title>
				<CreateTaskLeftSide
					createTask={createTask}
					group={group}
					setUsers={setUsers}
					users={users}
				/>
				<CreateTaskRightSide features={features} setFeatures={setFeatures} />
			</Form>
		</Page>
	)
}

export default CreateTask
