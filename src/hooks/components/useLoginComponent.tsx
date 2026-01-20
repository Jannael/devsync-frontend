import { useState } from 'react'
import { routesConst } from '../../routes.constants'
import ValidateFromSchema from '../../service/FormValidations/ValidateFromSchema'
import LoginValidator from '../../service/LoginValidation'
import useRefreshTokenCode from '../auth/useRefreshTokenCode'

function useLoginComponent() {
	const [error, setError] = useState<string | null>(null)

	const { requestRefreshTokenCode } = useRefreshTokenCode(() => {
		window.location.href = routesConst.verifyLogin
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const data = ValidateFromSchema({
			formEvent: e,
			validator: LoginValidator,
			setError,
		})
		if (!data) return

		requestRefreshTokenCode.mutate({
			account: data.account.toString(),
			pwd: data.pwd.toString(),
		})
	}
	return { handleSubmit, error, requestRefreshTokenCode }
}

export default useLoginComponent
