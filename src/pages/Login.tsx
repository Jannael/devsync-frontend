import { useState } from 'react'
import Form from '../components/ui/Form'
import FormButton from '../components/ui/FormButton'
import InputText from '../components/ui/InputText'
import P from '../components/ui/P'
import Page from '../components/ui/Page'
import Title from '../components/ui/Title'

function Login() {
	const [verifyCode, setVerifyCode] = useState(false)

	return (
		<Page className='flex justify-center items-center'>
			{verifyCode ? (
				<Form>
					<Title className=''>Verify code</Title>
					<P className='w-full text-center mb-2'>
						We have send you a code to your email please verify it
					</P>
					<InputText className='w-full' placeholder='1234' />
					<FormButton className='w-5/10 mt-4'>Verify</FormButton>
				</Form>
			) : (
				<Form>
					<Title className='mb-4'>Login</Title>
					<InputText className='w-full' placeholder='example@gmail.com' />
					<InputText className='w-full' placeholder='password' />
					<FormButton
						className='mt-4 w-5/10'
						onClick={(e) => {
							e.preventDefault()
							setVerifyCode(true)
						}}
					>
						Login
					</FormButton>
				</Form>
			)}
		</Page>
	)
}

export default Login
