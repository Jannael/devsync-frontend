import EnterCodeModal from '../../components/EnterCodeModal'
import Form from '../../components/ui/Form'
import Page from '../../components/ui/Page'
import VerifyCodeModal from '../../components/VerifyCodeModal'
import useVerifyCodeComponent from '../../hooks/components/useVerifyCodeComponent'
import { localStorageKeys } from '../../localStorageKeys'
import AccountValidator from '../../service/AccountValidation'
import VerifyCodeForm from '../../service/FormValidations/auth/VerifyCodeForm'
import ValidateFromSchema from '../../service/FormValidations/ValidateFromSchema'

function VerifyCode() {
	const { verifyCode, setError, error, requestCode, verifyCodeMutation } =
		useVerifyCodeComponent()

	return (
		<Page className='flex justify-center items-center'>
			{verifyCode ? (
				<Form
					className='w-6/10 max-w-96'
					onSubmit={(e) => {
						const data = VerifyCodeForm(e, setError)
						if (!data) return

						const account = localStorage.getItem(localStorageKeys.verifyCode)
						if (account === null) return
						verifyCodeMutation.mutate({ account, code: data.code.toString() })
					}}
				>
					<VerifyCodeModal
						blockSubmit={verifyCodeMutation.isPending}
						error={
							verifyCodeMutation.isError
								? verifyCodeMutation.error.message
								: error
						}
					/>
				</Form>
			) : (
				<Form
					className='w-6/10 max-w-96'
					onSubmit={(e) => {
						const data = ValidateFromSchema({
							formEvent: e,
							validator: AccountValidator,
							setError,
						})
						if (!data) return

						localStorage.setItem(
							localStorageKeys.verifyCode,
							data.account.toString(),
						)
						requestCode.mutate({ account: data.account.toString() })
					}}
				>
					<EnterCodeModal
						blockSubmit={requestCode.isPending}
						error={requestCode.isError ? requestCode.error.message : error}
					/>
				</Form>
			)}
		</Page>
	)
}

export default VerifyCode
