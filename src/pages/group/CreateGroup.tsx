import { Toaster } from 'sonner'
import MemberInput from '../../components/group/MemberInput'
import TechLeadInput from '../../components/group/TechLeadInput'
import ColorPicker from '../../components/ui/ColorPicker'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useCreateGroupComponent from '../../hooks/components/useCreateGroupComponent'

function CreateGroup() {
	const {
		handleSubmit,
		error,
		setError,
		setTechLeads,
		setMembers,
		members,
		techLeads,
		createGroup,
	} = useCreateGroupComponent()

	return (
		<Page className='flex justify-center items-center'>
			<Toaster />
			<Form onSubmit={handleSubmit}>
				<Title>Create group</Title>

				<Label>
					Group name
					<InputText className='w-full' name='name' placeholder='my group' />
				</Label>
				<Label>
					Repository
					<InputText
						className='w-full'
						name='repository'
						placeholder='https://github...'
					/>
				</Label>
				<Label>
					Color
					<ColorPicker name='color' />
				</Label>
				<MemberInput
					members={members}
					setError={setError}
					setMembers={setMembers}
				/>
				<TechLeadInput
					setError={setError}
					setTechLeads={setTechLeads}
					techLeads={techLeads}
				/>
				{error !== null && <P className='text-error'>{error}</P>}
				<FormButton block={createGroup.isPending}>Create</FormButton>
			</Form>
		</Page>
	)
}

export default CreateGroup
