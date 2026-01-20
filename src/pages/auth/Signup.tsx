import { useState } from 'react'
import { Link } from 'react-router'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useCreateUser from '../../hooks/auth/useCreateUser'
import { localStorageKeys } from '../../localStorageKeys'
import { routesConst } from '../../routes.constants'
import ValidateFromSchema from '../../service/FormValidations/ValidateFromSchema'
import signupValidator from '../../service/SignupValidation'

function Signup() {
	const [error, setError] = useState<string | null>(null)

	const { create: signUp } = useCreateUser(() => {
		localStorage.removeItem(localStorageKeys.verifyCode)
		window.location.href = routesConst.main
	})

	return (
		<Page className='flex items-center justify-center'>
			<Form
				className='w-6/10 max-w-96'
				onSubmit={async (e) => {
					const data = ValidateFromSchema({
						formEvent: e,
						validator: signupValidator,
						setError,
					})
					if (!data) return

					const account = localStorage.getItem(localStorageKeys.verifyCode)
					if (account === null) {
						setError('Missing account')
						return
					}

					signUp.mutate({
						fullName: data.fullName.toString(),
						account: account,
						pwd: data.pwd.toString(),
						nickName: data.nickName.toString(),
					})
				}}
			>
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
				{signUp.isError && (
					<P className='text-error text-center'>{signUp.error.message}</P>
				)}
				<div className='w-full mt-4 text-left'>
					<Link to={routesConst.login}>Already have an account?</Link>
				</div>
			</Form>
		</Page>
	)
}

export default Signup
