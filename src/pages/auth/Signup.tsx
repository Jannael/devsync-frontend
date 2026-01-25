import { Link } from 'react-router'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useSignUpComponent from '../../hooks/components/useSignupComponent'
import { routesConst } from '../../routes.constants'

function Signup() {
	const { handleSubmit, signUp, error } = useSignUpComponent()

	return (
		<Page className='flex items-center justify-center'>
			<Form className='w-6/10 max-w-96' onSubmit={handleSubmit}>
				<Title className='mb-4'>Signup</Title>
				<Label>
					FullName
					<InputText
						className='w-full'
						name='fullName'
						placeholder='Jon Doe Ramirez'
						required
					/>
				</Label>
				<Label>
					Password
					<InputText
						className='w-full'
						name='pwd'
						placeholder='my secret password'
						required
					/>
				</Label>
				<Label>
					NickName
					<InputText
						className='w-full'
						name='nickName'
						placeholder='nickname'
						required
					/>
				</Label>
				<FormButton block={signUp.isPending} className='mt-4'>
					Signup
				</FormButton>
				{error !== null && <P className='text-error text-center'>{error}</P>}
				<div className='w-full mt-4 text-left'>
					<Link to={routesConst.login}>Already have an account?</Link>
				</div>
			</Form>
		</Page>
	)
}

export default Signup
