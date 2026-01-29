import { useState } from 'react'
import useRequestCodeAccount from '../../hooks/auth/useRequestCodeAccount'
import useVerifyCodeAccount from '../../hooks/auth/useVerifyCodeAccount'
import ChangeAccountCode from '../../service/FormValidations/auth/ChangeAccountCode'
import VerifyAccount from '../../service/FormValidations/auth/VerifyAccount'

function useChangeAccountComponent() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { verifyCodeAccount } = useVerifyCodeAccount()

	const { requestCodeAccount: requestCode } = useRequestCodeAccount(() => {
		setVerifyCode(true)
	})

	const handleRequestCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const data = VerifyAccount(e, setError)
		if (!data) return

		requestCode.mutate({ newAccount: data.account.toString() })
	}

	const handleVerifyCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const data = ChangeAccountCode(e, setError)
		if (!data) return

		verifyCodeAccount.mutate({
			codeCurrentAccount: data.codeCurrentAccount.toString(),
			codeNewAccount: data.codeNewAccount.toString(),
		})
	}

	return {
		verifyCode,
		handleRequestCodeSubmit,
		handleVerifyCodeSubmit,
		error,
		requestCode,
		verifyCodeAccount,
	}
}

export default useChangeAccountComponent
