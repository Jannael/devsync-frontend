function VerifyCode(
	e: React.FormEvent<HTMLFormElement>,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	e.preventDefault()
	const formData = new FormData(e.currentTarget)
	const data = Object.fromEntries(formData.entries())
	if (typeof Number(data.code) !== 'number') {
		setError('invalid code')
    return
	}

	return data
}

export default VerifyCode