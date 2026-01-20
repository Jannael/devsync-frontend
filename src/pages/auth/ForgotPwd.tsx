import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useForgotPwdComponent from '../../hooks/components/useForgotPwd'

function ForgotPwd() {
	const {
		verifyCode,
		handleVerifyCodeSubmit,
		handleRequestCodeSubmit,
		error,
		passwordRequestCode,
		passwordVerifyCode,
	} = useForgotPwdComponent()

	return (
		<Page className='flex justify-center items-center'>
			{verifyCode && (
				<Form className='w-6/10 max-w-96' onSubmit={handleVerifyCodeSubmit}>
					<Title>Change password</Title>
					<Label>
						Code
						<InputText className='w-full' name='code' placeholder='1234' />
					</Label>
					<Label>
						New password
						<InputText name='newPwd' placeholder='new password' />
					</Label>
					{error !== null && (
						<P className='w-full text-error text-center'>{error}</P>
					)}
					{passwordRequestCode.isError && (
						<P className='w-full text-error text-center'>
							{passwordRequestCode.error.message}
						</P>
					)}

					<FormButton block={passwordVerifyCode.isPending}>Change</FormButton>
				</Form>
			)}
			{!verifyCode && (
				<Form className='w-6/10 max-w-96' onSubmit={handleRequestCodeSubmit}>
					<Title>Account</Title>
					<Label>
						Account
						<InputText name='account' placeholder='example@gmail.com' />
					</Label>
					{error !== null && (
						<P className='w-full text-error text-center'>{error}</P>
					)}
					{passwordRequestCode.isError && (
						<P className='w-full text-error text-center'>
							{passwordRequestCode.error.message}
						</P>
					)}
					<FormButton block={passwordRequestCode.isPending}>
						Request code
					</FormButton>
				</Form>
			)}
		</Page>
	)
}

export default ForgotPwd
