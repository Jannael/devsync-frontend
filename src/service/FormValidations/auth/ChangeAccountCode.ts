function ChangeAccountCode(
	e: React.FormEvent<HTMLFormElement>,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	e.preventDefault()
	setError(null)

	const formData = new FormData(e.currentTarget)
	const data = Object.fromEntries(formData.entries())

	if (Number.isNaN(Number(data.codeCurrentAccount))) {
		setError('Invalid code current account')
		return
	}

	if (Number.isNaN(Number(data.codeNewAccount))) {
		setError('Invalid code new account')
		return
	}
	return data
}

export default ChangeAccountCode
