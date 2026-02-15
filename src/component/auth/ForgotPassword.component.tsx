import { Fragment } from 'react'
import useForgotPasswordComponent from '../../hook/component/auth/useForgotPassword.hook'
import useLoginStore from '../../store/Login.store'
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
	const {
		handleRequestCode,
		handleVerifyCode,
		verifyCode,
		error,
		requestCodeMutation,
		verifyCodeMutation,
	} = useForgotPasswordComponent()

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
