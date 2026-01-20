import { useState } from 'react'
import { localStorageKeys } from '../../localStorageKeys'
import { routesConst } from '../../routes.constants'
import ValidateFromSchema from '../../service/FormValidations/ValidateFromSchema'
import signupValidator from '../../service/SignupValidation'
import useCreateUser from '../auth/useCreateUser'

function useSignUpComponent() {
	const [error, setError] = useState<string | null>(null)

	const { create: signUp } = useCreateUser(() => {
		localStorage.removeItem(localStorageKeys.verifyCode)
		window.location.href = routesConst.main
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const data = ValidateFromSchema({
			formEvent: e,
			validator: signupValidator,
			setError,
		})
		if (!data) return

		const account = localStorage.getItem(localStorageKeys.verifyCode)
		if (account === null) {
			setError('Missing account')
			return
		}

		signUp.mutate({
			fullName: data.fullName.toString(),
			account: account,
			pwd: data.pwd.toString(),
			nickName: data.nickName.toString(),
		})
	}

	return { handleSubmit, signUp, error }
}

export default useSignUpComponent
