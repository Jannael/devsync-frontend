import { useRef, useState } from 'react'
import GetFormData from '../../../utils/GetFormData.utils'
import AccountValidator from '../../../validator/fields/Account.validator'
import { PasswordValidator } from '../../../validator/fields/Password.schema'
import { useForgotPassword } from '../../mutation/auth/useForgotPassword.mutation'
import { useVerifyForgotPassword } from '../../mutation/auth/useVerifyForgotPassword.mutation'

function useForgotPasswordComponent() {
	const userInfo = useRef({
		account: '',
		password: '',
	})

	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const requestCodeMutation = useForgotPassword()
	const verifyCodeMutation = useVerifyForgotPassword()

	const handleRequestCode = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		userInfo.current = {
			account: data.account,
			password: data.password,
		}

		try {
			const isValidAccount = AccountValidator({ account: data.account })
			if (!isValidAccount) throw new Error('Invalid account')
			PasswordValidator({ password: data.password })
			if (data.password !== data['confirm-password'])
				throw new Error('Passwords do not match')

			await requestCodeMutation.mutateAsync({ account: data.account })

			setVerifyCode(true)
		} catch (e) {
			setError((e as Error).message)
		}
	}

	const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		try {
			await verifyCodeMutation.mutateAsync({
				code: data.code,
				newPwd: userInfo.current.password,
			})
		} catch (e) {
			setError((e as Error).message)
		}
	}

	return {
		handleRequestCode,
		handleVerifyCode,
		verifyCode,
		error,
		requestCodeMutation,
		verifyCodeMutation,
	}
}

export default useForgotPasswordComponent
