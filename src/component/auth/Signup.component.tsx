import { Fragment } from 'react'
import useSignup from '../../hook/component/auth/useSignup.hook'
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
		id: 'fullName',
		name: 'fullName',
		label: 'Full name',
		placeholder: 'Joel Miller',
		type: 'text',
	},
	{
		id: 'nickName',
		name: 'nickName',
		label: 'Nick name',
		placeholder: 'Firefly killer',
		type: 'text',
	},
	{
		id: 'email',
		name: 'email',
		label: 'Account',
		placeholder: 'joelMiller@gmail.com',
		type: 'email',
	},
	{
		id: 'password',
		name: 'password',
		label: 'Password',
		placeholder: 'secret password',
		type: 'password',
	},
]

function Signup() {
	const {
		handleSubmit,
		handleVerifyCode,
		verifyCode,
		error,
		requestCode,
		verifyCodeMutation,
		createUser,
	} = useSignup()

	const inputsItems = inputs.map((input) => (
		<Fragment key={input.id}>
			<Label id={input.id}>{input.label}</Label>
			<Input {...input} />
		</Fragment>
	))

	return verifyCode ? (
		<VerifyCode
			block={verifyCodeMutation.isPending || createUser.isPending}
			error={error}
			onSubmit={handleVerifyCode}
		/>
	) : (
		<Form onSubmit={handleSubmit}>
			<Title>Signup</Title>
			<P>Please fill in the form below to create an account</P>
			{inputsItems}
			{error && <Warning message={error} />}
			<Button block={requestCode.isPending} type='submit'>
				Signup
			</Button>
			<TextButton
				buttonText='Login'
				onClick={() => useLoginStore.setState({ show: 'login' })}
				text='Already have an account? '
			/>
		</Form>
	)
}

export default Signup
