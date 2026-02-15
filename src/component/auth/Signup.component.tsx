import { Fragment, useRef, useState } from 'react'
import { useRequestCode } from '../../hook/mutation/auth/useRequestCode.mutation'
import { useVerifyCode } from '../../hook/mutation/auth/useVerifyCode.mutation'
import { useCreateUser } from '../../hook/mutation/user/useCreateUser.mutation'
import GetFormData from '../../utils/GetFormData.utils'
import { UserValidator } from '../../validator/schemas/User.schema'
import Button from '../ui/Button.ui'
import Form from '../ui/Form.ui'
import Input from '../ui/Input.ui'
import Label from '../ui/Label.ui'
import P from '../ui/P.ui'
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
		label: 'Nick name (optional)',
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
	const [verifyCode, setVerifyCode] = useState(false)
	const requestCode = useRequestCode()
	const verifyCodeMutation = useVerifyCode()
	const createUser = useCreateUser()
	const [error, setError] = useState<string | null>(null)
	const formData = useRef({
		fullName: '',
		nickName: '',
		account: '',
		pwd: '',
	})

	const inputsItems = inputs.map((input) => (
		<Fragment key={input.id}>
			<Label id={input.id}>{input.label}</Label>
			<Input {...input} />
		</Fragment>
	))

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		const userInfo = {
			fullName: data.fullName,
			nickName: data.nickName,
			account: data.email,
			pwd: data.password,
		}
		try {
			console.log(userInfo)
			UserValidator({
				data: userInfo,
			})
		} catch (e) {
			console.log(e)
			setError((e as Error).message)
			return
		}

		await requestCode.mutateAsync({
			account: data.email,
		})
		setVerifyCode(true)
		formData.current = {
			fullName: data.fullName,
			nickName: data.nickName,
			account: data.email,
			pwd: data.password,
		}
	}

	const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		const res = await verifyCodeMutation.mutateAsync({
			code: data.code,
		})
		if (res) {
			await createUser.mutateAsync({
				fullName: formData.current.fullName,
				nickName: formData.current.nickName,
				pwd: formData.current.pwd,
			})
		}
	}

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
		</Form>
	)
}

export default Signup
