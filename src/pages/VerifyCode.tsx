import { useState } from 'react'
import { useSearchParams } from 'react-router'
import EnterCodeModal from '../components/EnterCodeModal'
import Form from '../components/ui/Form'
import Page from '../components/ui/Page'
import VerifyCodeModal from '../components/VerifyCodeModal'
import { localStorageKeys } from '../localStorageKeys'
import AccountValidator from '../service/AccountValidation'
import authModel from './../service/api/models/auth/model'

function VerifyCode() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [searchParams] = useSearchParams()

	return (
		<Page className='flex justify-center items-center'>
			{verifyCode ? (
				<Form
					className='w-6/10 max-w-96'
					onSubmit={async (e) => {
						e.preventDefault()
						const formData = new FormData(e.currentTarget)
						const data = Object.fromEntries(formData.entries())
						const account = localStorage.getItem(localStorageKeys.verifyCode)
						if (account === null) return

						try {
							const res = await authModel.verifyCode({
								account,
								code: data.code.toString(),
							})
							if (res.success !== true)
								throw { description: 'Something went wrong please try again' }

							// we get the redirect as queryParam
							const redirect = searchParams.get('redirect')
							window.location.href = redirect !== null ? redirect : ''
						} catch (e) {
							setError((e as Record<string, string>).description)
						}
					}}
				>
					<VerifyCodeModal error={error} />
				</Form>
			) : (
				<Form
					className='w-6/10 max-w-96'
					onSubmit={async (e) => {
						e.preventDefault()
						const formData = new FormData(e.currentTarget)
						const data = Object.fromEntries(formData.entries())
						const isValid = AccountValidator(data as Record<string, string>)

						if (typeof isValid === 'string') {
							setError(isValid)
							return
						}

						localStorage.setItem(localStorageKeys.verifyCode, isValid.account)

						try {
							await authModel.requestCode({ account: isValid.account })
							setVerifyCode(true)
						} catch (e) {
							setError((e as Record<string, string>).description)
						}
					}}
				>
					<EnterCodeModal error={error} />
				</Form>
			)}
		</Page>
	)
}

export default VerifyCode
