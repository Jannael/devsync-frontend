import { Fragment, useRef, useState } from 'react'
import { useRequestLogin } from '../../hook/mutation/auth/useRequestLogin.mutation'
import { useVerifyLogin } from '../../hook/mutation/auth/useVerifyLogin.mutation'
import useLoginStore from '../../store/Login.store'
import GetFormData from '../../utils/GetFormData.utils'
import AccountValidator from '../../validator/fields/Account.validator'
import { PasswordValidator } from '../../validator/fields/Password.schema'
import Button from '../ui/Button.ui'
import Form from '../ui/Form.ui'
import Input from '../ui/Input.ui'
import Label from '../ui/Label.ui'
import P from '../ui/P.ui'
import TextButton from '../ui/TextButton.ui'
import Title from '../ui/Title.ui'
import Warning from '../ui/Warning.ui'
import VerifyCode from './VerifyCode.component'

const inputs = [
	{
		id: 'email',
		name: 'account',
		label: 'Email',
		placeholder: 'Email',
		type: 'email',
	},
	{
		id: 'password',
		name: 'password',
		label: 'Password',
		placeholder: 'Password',
		type: 'password',
	},
]

function Login() {
	const loginInfo = useRef({
		account: '',
		pwd: '',
	})
	const [error, setError] = useState<null | string>(null)
	const [verifyCode, setVerifyCode] = useState(false)
	const requestCode = useRequestLogin()
	const verifyCodeMutation = useVerifyLogin()

	const inputsItems = inputs.map((input) => (
		<Fragment key={input.id}>
			<Label id={input.id}>{input.label}</Label>
			<Input {...input} />
		</Fragment>
	))

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		loginInfo.current = {
			account: data.account,
			pwd: data.password,
		}

		try {
			const isValid = AccountValidator({ account: data.account })
			if (!isValid) throw new Error('Invalid account')
			PasswordValidator({ password: data.password })
			requestCode.mutate({ account: data.account, pwd: data.password })
			setVerifyCode(true)
		} catch (error) {
			setError((error as Error).message)
		}
	}

	const handleVerifyCode = (e: React.FormEvent<HTMLFormElement>) => {
		const data = GetFormData(e)
		verifyCodeMutation.mutate({ code: data.code })
	}

	return verifyCode ? (
		<VerifyCode
			block={requestCode.isPending || verifyCodeMutation.isPending}
			error={error}
			onSubmit={handleVerifyCode}
		/>
	) : (
		<Form onSubmit={handleSubmit}>
			<Title>Login</Title>
			<P>Please fill in the form below to login</P>
			{inputsItems}
			{error && <Warning message={error} />}

			<Button block={false} type='submit'>
				Login
			</Button>

			<TextButton
				buttonText='Click here'
				onClick={() => useLoginStore.setState({ show: 'forgot-password' })}
				text='Forgot password? '
			/>
			<TextButton
				buttonText='Signup'
				onClick={() => useLoginStore.setState({ show: 'signup' })}
				text="Don't have an account? "
			/>
		</Form>
	)
}

export default Login
