import { useState } from 'react'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import VerifyCodeModal from '../../components/VerifyCodeModal'

function ForgotPwd() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [newPwd, setNewPwd] = useState(false)

	return (
		<Page className='flex justify-center items-center'>
			{verifyCode && !newPwd && (
				<Form
					className='w-6/10 max-w-96'
					onSubmit={(e) => {
						e.preventDefault()
						// todo verify code
						// inputName => code
						setVerifyCode(true)
						setNewPwd(true)
					}}
				>
					<VerifyCodeModal blockSubmit={false} error={''} />
				</Form>
			)}

			{!verifyCode && !newPwd && (
				<Form
					className='w-6/10 max-w-96'
					onSubmit={(e) => {
						e.preventDefault()
						// todo request code
						setVerifyCode(true)
					}}
				>
					<Title>Account</Title>
					<Label>
						Account
						<InputText name='account' placeholder='example@gmail.com' />
					</Label>
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
					<Label>
						New password
						<InputText name='newPwd' placeholder='new password' />
					</Label>
					<FormButton>Change</FormButton>
				</Form>
			)}
		</Page>
	)
}

export default ForgotPwd
