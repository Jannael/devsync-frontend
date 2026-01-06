import { useState } from 'react'
import { Link } from 'react-router'
import Form from '../components/ui/Form'
import FormButton from '../components/ui/FormButton'
import InputText from '../components/ui/InputText'
import Label from '../components/ui/Label'
import P from '../components/ui/P'
import Page from '../components/ui/Page'
import Title from '../components/ui/Title'
import { routesConst } from '../routes.constants'
import FormValidator from '../service/LoginValidation'

function Login() {
	const [error, setError] = useState<string | null>(null)

	return (
		<Page className='flex justify-center items-center'>
			<Form
				onSubmit={(e) => {
					e.preventDefault()
					const formData = new FormData(e.currentTarget)
					const data = Object.fromEntries(formData.entries())
					const isValid = FormValidator(data as Record<string, string>)
					if (typeof isValid === 'string') {
						setError(isValid)
						return
					}
					// todo make the request to the server
					window.location.href = routesConst.verifyLogin
				}}
			>
				<Title className='mb-4'>Login</Title>
				<Label>
					Account
					<InputText
						className='w-full'
						name='account'
						placeholder='example@gmail.com'
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
				<FormButton className='mt-4'>Login</FormButton>
				{error !== null && (
					<P className='text-error w-full text-center'>{error}</P>
				)}
				<div className='flex flex-col text-md w-full gap-2 text-left'>
					<Link to={`${routesConst.verifyCode}?redirect=${routesConst.signup}`}>
						New user?
					</Link>
					<Link to={routesConst.forgotPwd}>Forgot password?</Link>
				</div>
			</Form>
		</Page>
	)
}

export default Login
