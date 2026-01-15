import { useState } from 'react'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import AccountValidator from '../../service/AccountValidation'

function ChangeAccount() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)
	return (
		<Page className='flex items-center justify-center'>
			{!verifyCode && (
				<Form
					className='w-6/10 max-w-96'
					onSubmit={(e) => {
						e.preventDefault()
						setError(null)
						const formData = new FormData(e.currentTarget)
						const data = Object.fromEntries(formData.entries())
						const isValid = AccountValidator({
							account: data.newAccount,
						} as Record<string, string>)

						if (typeof isValid === 'string') {
							setError(isValid)
							return
						}

						setVerifyCode(true)
					}}
				>
					<Title>Change account</Title>
					<Label>
						New account
						<InputText name='newAccount' placeholder='example@gmail.com' />
					</Label>

					{error !== null && <P className='text-error'>{error}</P>}
					<FormButton>Next</FormButton>
				</Form>
			)}
			{verifyCode && (
				<Form
					className='w-6/10 max-w-96'
					onSubmit={(e) => {
						e.preventDefault()
						setError(null)
						const formData = new FormData(e.currentTarget)
						const data = Object.fromEntries(formData.entries())
						if (Number.isNaN(Number(data.codeCurrentAccount))) {
							setError('Invalid code current account')
							return
						}
						if (Number.isNaN(Number(data.codeNewAccount))) {
							setError('Invalid code new account')
							return
						}
						// todo => request
					}}
				>
					<Title className=''>Verify code</Title>
					<P className='w-full mb-2 text-center'>
						We have send an email to your current and new account
					</P>
					<Label>
						Code current account
						<InputText
							className='w-full'
							name='codeCurrentAccount'
							placeholder='1234'
						/>
					</Label>

					<Label>
						Code new account
						<InputText
							className='w-full'
							name='codeNewAccount'
							placeholder='1234'
						/>
					</Label>
					{error !== null && <P className='text-error'>{error}</P>}
					<FormButton className='mt-4'>Verify</FormButton>
				</Form>
			)}
		</Page>
	)
}

export default ChangeAccount
