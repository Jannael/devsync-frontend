import { useState } from 'react'
import { Link } from 'react-router'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useRefreshTokenCode from '../../hooks/auth/useRefreshTokenCode'
import { routesConst } from '../../routes.constants'
import ValidateFromSchema from '../../service/FormValidations/ValidateFromSchema'
import LoginValidator from '../../service/LoginValidation'

function Login() {
	const [error, setError] = useState<string | null>(null)

	const { requestRefreshTokenCode } = useRefreshTokenCode(() => {
		window.location.href = routesConst.verifyLogin
	})

	return (
		<Page className='flex justify-center items-center'>
			<Form
				className='w-6/10 max-w-96'
				onSubmit={async (e) => {
					const data = ValidateFromSchema({
						formEvent: e,
						validator: LoginValidator,
						setError,
					})
					if (!data) return

					requestRefreshTokenCode.mutate({
						account: data.account.toString(),
						pwd: data.pwd.toString(),
					})
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
				<FormButton block={requestRefreshTokenCode.isPending} className='mt-4'>
					Login
				</FormButton>
				{error !== null && (
					<P className='w-full text-error text-center'>{error}</P>
				)}
				{requestRefreshTokenCode.isError && (
					<P className='w-full text-error text-center'>
						{requestRefreshTokenCode.error.message}
					</P>
				)}
				<div
					className='
						flex flex-col
						w-full
						text-md text-left
						gap-2
					'
				>
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
