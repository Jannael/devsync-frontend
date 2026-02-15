import { Fragment, useRef, useState } from 'react'
import { useForgotPassword } from '../../hook/mutation/auth/useForgotPassword.mutation'
import { useVerifyForgotPassword } from '../../hook/mutation/auth/useVerifyForgotPassword.mutation'
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
	{
		id: 'confirm-password',
		name: 'confirm-password',
		label: 'Confirm Password',
		placeholder: 'Confirm Password',
		type: 'password',
	},
]

function ForgotPassword() {
	const userInfo = useRef({
		account: '',
		password: '',
	})

	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const requestCodeMutation = useForgotPassword()
	const verifyCodeMutation = useVerifyForgotPassword()

	const handleRequestCode = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		userInfo.current = {
			account: data.account,
			password: data.password,
		}

		try {
			const isValidAccount = AccountValidator({ account: data.account })
			if (!isValidAccount) throw new Error('Invalid account')
			PasswordValidator({ password: data.password })
			if (data.password !== data['confirm-password'])
				throw new Error('Passwords do not match')

			await requestCodeMutation.mutateAsync({ account: data.account })

			setVerifyCode(true)
		} catch (e) {
			setError((e as Error).message)
		}
	}

	const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		try {
			await verifyCodeMutation.mutateAsync({
				code: data.code,
				newPwd: userInfo.current.password,
			})
		} catch (e) {
			setError((e as Error).message)
		}
	}

	const inputsItems = inputs.map((input) => (
		<Fragment key={input.id}>
			<Label id={input.id}>{input.label}</Label>
			<Input {...input} />
		</Fragment>
	))

	return verifyCode ? (
		<VerifyCode
			block={requestCodeMutation.isPending || verifyCodeMutation.isPending}
			error={error}
			onSubmit={handleVerifyCode}
		/>
	) : (
		<Form onSubmit={handleRequestCode}>
			<Title>Forgot Password</Title>
			<P>Please fill in the form below to reset your password</P>
			{inputsItems}
			{error && <Warning message={error} />}

			<Button block={requestCodeMutation.isPending} type='submit'>
				Reset Password
			</Button>

			<TextButton
				buttonText='Click here'
				onClick={() => useLoginStore.setState({ show: 'login' })}
				text='Back to login? '
			/>
		</Form>
	)
}

export default ForgotPassword
