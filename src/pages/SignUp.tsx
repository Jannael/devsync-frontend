import { useState } from 'react'
import { Link } from 'react-router'
import Form from '../components/ui/Form'
import FormButton from '../components/ui/FormButton'
import InputText from '../components/ui/InputText'
import Label from '../components/ui/Label'
import P from '../components/ui/P'
import Page from '../components/ui/Page'
import Title from '../components/ui/Title'
import { localStorageKeys } from '../localStorageKeys'
import { routesConst } from '../routes.constants'
import FormValidator from './../service/SignupValidation'

function Signup() {
	const [error, setError] = useState<string | null>(null)

	return (
		<Page className='flex items-center justify-center'>
			<Form
				onSubmit={(e) => {
					e.preventDefault()
					const formData = new FormData(e.currentTarget)
					const account = localStorage.getItem(localStorageKeys.verifyCode)

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

					// todo make the request to create the user
					localStorage.removeItem(localStorageKeys.verifyCode)
					window.location.href = routesConst.main
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
				<FormButton className='mt-4'>Signup</FormButton>
				{error !== null && <P className='text-error text-center'>{error}</P>}
				<div className='text-left w-full mt-4'>
					<Link to={routesConst.login}>Already have an account?</Link>
				</div>
			</Form>
		</Page>
	)
}

export default Signup
