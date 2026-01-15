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
import { localStorageKeys } from '../../localStorageKeys'
import { routesConst } from '../../routes.constants'
import userModel from '../../service/api/models/user/model'
import FormValidator from '../../service/SignupValidation'

function Signup() {
	const [error, setError] = useState<string | null>(null)

	const signUp = useMutation({
		mutationFn: userModel.create,
		onSuccess: () => {
			localStorage.removeItem(localStorageKeys.verifyCode)
			window.location.href = routesConst.main
		},
	})

	return (
		<Page className='flex items-center justify-center'>
			<Form
				className='w-6/10 max-w-96'
				onSubmit={async (e) => {
					e.preventDefault()
					const formData = new FormData(e.currentTarget)
					const account = localStorage.getItem(localStorageKeys.verifyCode)
					if (account === null) {
						setError('Missing account')
						return
					}
					const { fullName, pwd, nickName } = Object.fromEntries(
						formData.entries(),
					)

					const isValid = FormValidator({
						account,
						fullName,
						pwd,
						nickName,
					} as Record<string, string>)

					if (typeof isValid === 'string') {
						setError(isValid)
						return
					}

					signUp.mutate({
						fullName: fullName.toString(),
						account: account.toString(),
						pwd: pwd.toString(),
						nickName: nickName.toString(),
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
