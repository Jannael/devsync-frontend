import Form from '../components/ui/Form'
import FormButton from '../components/ui/FormButton'
import InputText from '../components/ui/InputText'
import P from '../components/ui/P'
import Page from '../components/ui/Page'
import Title from '../components/ui/Title'

function ValidateLoginCode() {
	return (
		<Page className='flex justify-center items-center'>
			<Form>
				<Title className=''>Verify code</Title>
				<P className='w-full text-center mb-2'>
					We have send you a code to your email please verify it
				</P>
				<InputText className='w-full' placeholder='1234' />
				<FormButton className='w-5/10 mt-4'>Verify</FormButton>
			</Form>
		</Page>
	)
}

export default ValidateLoginCode
