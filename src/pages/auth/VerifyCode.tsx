import { useState } from 'react'
import { useSearchParams } from 'react-router'
import EnterCodeModal from '../../components/EnterCodeModal'
import Form from '../../components/ui/Form'
import Page from '../../components/ui/Page'
import VerifyCodeModal from '../../components/VerifyCodeModal'
import useRequestCode from '../../hooks/auth/useRequestCode'
import useVerifyCode from '../../hooks/auth/useVerifyCode'
import { localStorageKeys } from '../../localStorageKeys'
import AccountValidator from '../../service/AccountValidation'
import ValidateFromSchema from '../../service/FormValidations/ValidateFromSchema'

function VerifyCode() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [searchParams] = useSearchParams()

	const { requestCode } = useRequestCode(() => {
		setVerifyCode(true)
	})

	const { verifyCode: verifyCodeMutation } = useVerifyCode(() => {
		const redirect = searchParams.get('redirect')
		window.location.href = redirect !== null ? redirect : ''
	})

	return (
		<Page className='flex justify-center items-center'>
			{verifyCode ? (
				<Form
					className='w-6/10 max-w-96'
					onSubmit={(e) => {
						e.preventDefault()
						const formData = new FormData(e.currentTarget)
						const data = Object.fromEntries(formData.entries())
						const account = localStorage.getItem(localStorageKeys.verifyCode)
						if (account === null) return
						if (typeof Number(data.code) !== 'number') return
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
						const data = ValidateFromSchema({formEvent: e, validator: AccountValidator, setError})
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
