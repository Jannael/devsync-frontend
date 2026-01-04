import Form from '../components/ui/Form'
import InputText from '../components/ui/InputText'
import Page from '../components/ui/Page'

function Login() {
	return (
		<Page className='flex justify-center items-center'>
			<Form className='flex flex-col justify-center items-center gap-4'>
				<InputText placeholder='Hellos' />
				<InputText placeholder='Hellos' />
				<InputText placeholder='Hellos' />
				<InputText placeholder='Hellos' />
			</Form>
		</Page>
	)
}

export default Login
