import { useState } from 'react'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useRequestCodePwd from '../../hooks/auth/useRequestCodePwd'
import useVerifyCodePwd from '../../hooks/auth/useVerifyCodePwd'
import { localStorageKeys } from '../../localStorageKeys'
import { routesConst } from '../../routes.constants'
import VerifyAccount from '../../service/FormValidations/auth/VerifyAccount'
import VerifyCodePassword from '../../service/FormValidations/auth/VerifyCodePassword'

function ForgotPwd() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const { passwordVerifyCode } = useVerifyCodePwd(() => {
		window.location.href = routesConst.login
	})

	const { passwordRequestCode } = useRequestCodePwd(() => {
		setVerifyCode(true)
	})

	return (
		<Page className='flex justify-center items-center'>
			{verifyCode && (
				<Form
					className='w-6/10 max-w-96'
					onSubmit={(e) => {
						const data = VerifyCodePassword(e, setError)
						if (!data) return

						const account = localStorage.getItem(
							localStorageKeys.passwordVerifyCode,
						)
						if (account === null) return

						passwordVerifyCode.mutate({
							code: data.code.toString(),
							account,
							newPwd: data.newPwd.toString(),
						})
					}}
				>
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
				<Form
					className='w-6/10 max-w-96'
					onSubmit={(e) => {
						const data = VerifyAccount(e, setError)
						if (!data) return

						localStorage.setItem(
							localStorageKeys.passwordVerifyCode,
							data.account.toString(),
						)

						passwordRequestCode.mutate({ account: data.account.toString() })
					}}
				>
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
