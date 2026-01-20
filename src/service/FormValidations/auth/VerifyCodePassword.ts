import { validator as PasswordValidator } from '../../pwdSchema'

function VerifyCodePassword(
	e: React.FormEvent<HTMLFormElement>,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	e.preventDefault()
	const formData = new FormData(e.currentTarget)
	const data = Object.fromEntries(formData.entries())

	if (typeof Number(data.code) !== 'number') {
		setError('Invalid code')
		return
	}

	const isValidPwd = PasswordValidator({
		password: data.newPwd.toString(),
	})

	if (typeof isValidPwd === 'string') {
		setError(isValidPwd)
		return
	}

  return data
}

export default VerifyCodePassword
