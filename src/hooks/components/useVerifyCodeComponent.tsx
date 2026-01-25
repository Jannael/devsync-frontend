import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { localStorageKeys } from '../../localStorageKeys'
import AccountValidator from '../../service/AccountValidation'
import VerifyCodeForm from '../../service/FormValidations/auth/VerifyCodeForm'
import ValidateFromSchema from '../../service/FormValidations/ValidateFromSchema'
import verifyCodeActions from '../../verifyCodeActions'
import useRequestCode from '../auth/useRequestCode'
import useVerifyCode from '../auth/useVerifyCode'
import useDeleteUser from '../user/useDeleteUser'

function useVerifyCodeComponent() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [searchParams] = useSearchParams()

	const { requestCode } = useRequestCode(() => {
		setVerifyCode(true)
	})
	const { deleteUser } = useDeleteUser()

	const { verifyCode: verifyCodeMutation } = useVerifyCode(() => {
		const action = searchParams.get('action')
		if (action === verifyCodeActions.deleteUser) {
			deleteUser.mutate({})
		}

		const redirect = searchParams.get('redirect')
		if (redirect !== null) window.location.href = redirect
	})

	const handleVerifyCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const data = VerifyCodeForm(e, setError)
		if (!data) return

		const account = localStorage.getItem(localStorageKeys.verifyCode)
		if (account === null) return
		verifyCodeMutation.mutate({ account, code: data.code.toString() })
	}

	const handleEnterCodeModal = (e: React.FormEvent<HTMLFormElement>) => {
		const data = ValidateFromSchema({
			formEvent: e,
			validator: AccountValidator,
			setError,
		})
		if (!data) return

		localStorage.setItem(localStorageKeys.verifyCode, data.account.toString())
		requestCode.mutate({ account: data.account.toString() })
	}

	return {
		verifyCode,
		setError,
		error,
		requestCode,
		verifyCodeMutation,
		handleVerifyCodeSubmit,
		handleEnterCodeModal,
	}
}

export default useVerifyCodeComponent
