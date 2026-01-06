import ColorPicker from '../components/ui/ColorPicker'
import Form from '../components/ui/Form'
import InputText from '../components/ui/InputText'
import Label from '../components/ui/Label'
import Page from '../components/ui/Page'
import Title from '../components/ui/Title'

function CreateGroup() {
	return (
		<Page className='flex justify-center items-center'>
			<Form>
				<Title>Create group</Title>
				<Label>
					Group name
					<InputText className='w-full' placeholder='my group' />
				</Label>
				<Label>
					Repository
					<InputText className='w-full' placeholder='https://github...' />
				</Label>
				<Label>
					Color
					<ColorPicker />
				</Label>
				<Label>Members</Label>
				<Label>TechLeads</Label>
			</Form>
		</Page>
	)
}

export default CreateGroup
