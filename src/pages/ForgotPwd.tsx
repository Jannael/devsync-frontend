import { useState } from 'react'
import Form from '../components/ui/Form'
import FormButton from '../components/ui/FormButton'
import InputText from '../components/ui/InputText'
import Page from '../components/ui/Page'
import Title from '../components/ui/Title'
import VerifyCodeModal from '../components/VerifyCodeModal'

function ForgotPwd() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [newPwd, setNewPwd] = useState(false)

	return (
		<Page className='flex justify-center items-center'>
			{verifyCode && !newPwd && (
				<Form
					onSubmit={(e) => {
						e.preventDefault()
						// todo verify code
						// inputName => code
						setVerifyCode(true)
						setNewPwd(true)
					}}
				>
					<VerifyCodeModal />
				</Form>
			)}

			{!verifyCode && !newPwd && (
				<Form
					onSubmit={(e) => {
						e.preventDefault()
						// todo request code
						setVerifyCode(true)
					}}
				>
					<Title>Account</Title>
					<InputText name='account' placeholder='example@gmail.com' />
					<FormButton>Request code</FormButton>
				</Form>
			)}

			{verifyCode && newPwd && (
				<Form
					onSubmit={(e) => {
						e.preventDefault()
						// todo request change the password
					}}
				>
					<Title>New password</Title>
					<InputText name='newPwd' placeholder='new password' />
					<FormButton>Change</FormButton>
				</Form>
			)}
		</Page>
	)
}

export default ForgotPwd
