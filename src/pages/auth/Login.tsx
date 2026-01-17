import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import { routesConst } from '../../routes.constants'
import authModel from '../../service/api/models/auth/model'
import FormValidator from '../../service/LoginValidation'

function Login() {
	const [error, setError] = useState<string | null>(null)
	const requestRefreshTokenCode = useMutation({
		mutationFn: authModel.requestRefreshTokenCode,
		onSuccess: () => {
			// only move to the next section if there is no error
			window.location.href = routesConst.verifyLogin
		},
	})

	return (
		<Page className='flex justify-center items-center'>
			<Form
				className='w-6/10 max-w-96'
				onSubmit={async (e) => {
					e.preventDefault()
					const formData = new FormData(e.currentTarget)
					const data = Object.fromEntries(formData.entries())
					const isValid = FormValidator(data as Record<string, string>)
					if (typeof isValid === 'string') {
						setError(isValid)
						return
					}

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
