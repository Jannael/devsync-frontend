import { Fragment } from 'react'
import useLogin from '../../hook/component/auth/useLogin.hook'
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
]

function Login() {
	const {
		handleSubmit,
		handleVerifyCode,
		verifyCode,
		error,
		requestCode,
		verifyCodeMutation,
	} = useLogin()

	const inputsItems = inputs.map((input) => (
		<Fragment key={input.id}>
			<Label id={input.id}>{input.label}</Label>
			<Input {...input} />
		</Fragment>
	))

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
