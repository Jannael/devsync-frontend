import { useRef, useState } from 'react'
import GetFormData from '../../../utils/GetFormData.utils'
import AccountValidator from '../../../validator/fields/Account.validator'
import { PasswordValidator } from '../../../validator/fields/Password.schema'
import { useRequestLogin } from '../../mutation/auth/useRequestLogin.mutation'
import { useVerifyLogin } from '../../mutation/auth/useVerifyLogin.mutation'
import { ROUTES } from '../../../constant/Route.constant'

function useLogin() {
	const loginInfo = useRef({
		account: '',
		pwd: '',
	})
	const [error, setError] = useState<null | string>(null)
	const [verifyCode, setVerifyCode] = useState(false)
	const requestCode = useRequestLogin()
	const verifyCodeMutation = useVerifyLogin()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		loginInfo.current = {
			account: data.account,
			pwd: data.password,
		}

		try {
			const isValid = AccountValidator({ account: data.account })
			if (!isValid) throw new Error('Invalid account')
			PasswordValidator({ password: data.password })
			const res = await requestCode.mutateAsync({
				account: data.account,
				pwd: data.password,
			})
			setError(null)
			if (res) setVerifyCode(true)
		} catch (error) {
			setError((error as Error).message)
		}
	}

	const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		try {
			const res = await verifyCodeMutation.mutateAsync({ code: data.code })
			setError(null)
			if (res) window.location.href = ROUTES.MAIN
		} catch (e) {
			setError((e as Error).message)
		}
	}

	return {
		handleSubmit,
		handleVerifyCode,
		verifyCode,
		error,
		requestCode,
		verifyCodeMutation,
	}
}

export default useLogin
