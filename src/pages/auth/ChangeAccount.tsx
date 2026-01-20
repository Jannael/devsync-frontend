import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useChangeAccountComponent from '../../hooks/components/useChangeAccountComponent'

function ChangeAccount() {
	const {
		verifyCode,
		handleRequestCodeSubmit,
		handleVerifyCodeSubmit,
		error,
		requestCode,
		verifyCodeAccount,
	} = useChangeAccountComponent()

	return (
		<Page className='flex items-center justify-center'>
			{!verifyCode && (
				<Form className='w-6/10 max-w-96' onSubmit={handleRequestCodeSubmit}>
					<Title>Change account</Title>
					<Label>
						New account
						<InputText name='newAccount' placeholder='example@gmail.com' />
					</Label>

					{error !== null && <P className='text-error'>{error}</P>}
					<FormButton block={requestCode.isPending}>Next</FormButton>
				</Form>
			)}
			{verifyCode && (
				<Form className='w-6/10 max-w-96' onSubmit={handleVerifyCodeSubmit}>
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
					<FormButton block={verifyCodeAccount.isPending} className='mt-4'>
						Verify
					</FormButton>
				</Form>
			)}
		</Page>
	)
}

export default ChangeAccount
