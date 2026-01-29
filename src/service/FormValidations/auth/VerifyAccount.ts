import AccountValidator from '../../AccountValidation'

function VerifyAccount(
	e: React.FormEvent<HTMLFormElement>,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	e.preventDefault()
	setError(null)

	const formData = new FormData(e.currentTarget)
	const data = Object.fromEntries(formData.entries())
	const isValid = AccountValidator({
		account: data.account,
	} as Record<string, string>)

	if (typeof isValid === 'string') {
		setError(isValid)
		return
	}

  return data
}

export default VerifyAccount
