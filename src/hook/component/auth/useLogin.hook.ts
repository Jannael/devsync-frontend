import { useRef, useState } from 'react'
import GetFormData from '../../../utils/GetFormData.utils'
import AccountValidator from '../../../validator/fields/Account.validator'
import { PasswordValidator } from '../../../validator/fields/Password.schema'
import { useRequestLogin } from '../../mutation/auth/useRequestLogin.mutation'
import { useVerifyLogin } from '../../mutation/auth/useVerifyLogin.mutation'

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
			await requestCode.mutateAsync({
				account: data.account,
				pwd: data.password,
			})
			setVerifyCode(true)
		} catch (error) {
			setError((error as Error).message)
		}
	}

	const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
		const data = GetFormData(e)
		try {
			await verifyCodeMutation.mutateAsync({ code: data.code })
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
