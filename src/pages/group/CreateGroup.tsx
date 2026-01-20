import { useState } from 'react'
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
import useCreateGroup from '../../hooks/group/useCreateGroup'
import { routesConst } from '../../routes.constants'
import ValidateFromSchema from '../../service/FormValidations/ValidateFromSchema'
import GroupValidator from '../../service/GroupValidation'

function CreateGroup() {
	const [error, setError] = useState<string | null>(null)
	const [members, setMembers] = useState<
		Array<{ account: string; role: string }>
	>([])
	const [techLeads, setTechLeads] = useState<string[]>([])

	const { createGroup } = useCreateGroup(() => {
		window.location.href = routesConst.main
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// adding the members and techLeads to formData so it can be validated
		const formData = new FormData(e.currentTarget)
		formData.append('member', JSON.stringify(members))
		formData.append('techLead', JSON.stringify(techLeads))

		const isValid = ValidateFromSchema({
			formEvent: e,
			setError,
			validator: GroupValidator,
		})
		if (!isValid) return
		const { name, repository, color } = isValid

		createGroup.mutate({
			name,
			repository,
			color,
			member: members,
			techLead: techLeads,
		})
	}

	return (
		<Page className='flex justify-center items-center'>
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
				{createGroup.isError && (
					<P className='text-error'>{createGroup.error.message}</P>
				)}
				<FormButton block={createGroup.isPending}>Create</FormButton>
			</Form>
		</Page>
	)
}

export default CreateGroup
