import FeaturesInput from '../../components/group/FeaturesInput'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Textarea from '../../components/ui/Textarea'
import Title from '../../components/ui/Title'
import useSolveTaskComponent from '../../hooks/components/useSolveTaskComponent'

function SolveTask() {
	const { handleSubmit, taskId, error, feature, setFeature, solveTask } =
		useSolveTaskComponent()

	return (
		<Page className='flex justify-center items-center'>
			<Form className='w-6/10 max-w-xl' onSubmit={handleSubmit}>
				<Title>Solve task</Title>
				<P>{`taskId = ${taskId}`}</P>
				<Label>
					Description
					<Textarea
						className='h-auto max-h-24'
						name='description'
						placeholder='i fix the issue using ...'
					/>
				</Label>
				<FeaturesInput
					className='w-full'
					features={feature}
					setFeatures={setFeature}
				/>
				<div className='w-full'>
					<Label>
						Code
						<Textarea
							className='min-h-50 h-auto max-h-24'
							name='code'
							placeholder='function hello() {}'
						/>
					</Label>
				</div>
				{error && <P className='text-red-500'>{error}</P>}
				<FormButton block={solveTask.isPending}>Solve task</FormButton>
			</Form>
		</Page>
	)
}

export default SolveTask
