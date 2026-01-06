import { useState } from 'react'
import ColorPicker from '../components/ui/ColorPicker'
import Form from '../components/ui/Form'
import FormButton from '../components/ui/FormButton'
import InputText from '../components/ui/InputText'
import Label from '../components/ui/Label'
import Page from '../components/ui/Page'
import Title from '../components/ui/Title'
import Wrapper, {WrapperItem} from '../components/Wrapper'

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
				<Label className='h-fit'>
					Members
					<Wrapper>
						<WrapperItem>Member</WrapperItem>
						<WrapperItem>Member</WrapperItem>
						<WrapperItem>Member</WrapperItem>
						<WrapperItem>Member</WrapperItem>
					</Wrapper>
				</Label>
				<Label>
					TechLeads

				</Label>

				<FormButton>Create</FormButton>
			</Form>
		</Page>
	)
}

export default CreateGroup
