import { useState } from 'react'
import { localStorageKeys } from '../../localStorageKeys'
import { routesConst } from '../../routes.constants'
import VerifyAccount from '../../service/FormValidations/auth/VerifyAccount'
import VerifyCodePassword from '../../service/FormValidations/auth/VerifyCodePassword'
import useRequestCodePwd from '../auth/useRequestCodePwd'
import useVerifyCodePwd from '../auth/useVerifyCodePwd'

function useForgotPwdComponent() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const { passwordVerifyCode } = useVerifyCodePwd(() => {
		window.location.href = routesConst.login
	})

	const { passwordRequestCode } = useRequestCodePwd(() => {
		setVerifyCode(true)
	})

	const handleVerifyCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const data = VerifyCodePassword(e, setError)
		if (!data) return

		const account = localStorage.getItem(localStorageKeys.passwordVerifyCode)
		if (account === null) return

		passwordVerifyCode.mutate({
			code: data.code.toString(),
			account,
			newPwd: data.newPwd.toString(),
		})
	}

	const handleRequestCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const data = VerifyAccount(e, setError)
		if (!data) return

		localStorage.setItem(
			localStorageKeys.passwordVerifyCode,
			data.account.toString(),
		)

		passwordRequestCode.mutate({ account: data.account.toString() })
	}

	return {
		verifyCode,
		handleVerifyCodeSubmit,
		handleRequestCodeSubmit,
		error,
		passwordRequestCode,
		passwordVerifyCode,
	}
}

export default useForgotPwdComponent
