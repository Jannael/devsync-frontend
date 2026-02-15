import { useRef, useState } from 'react'
import GetFormData from '../../../utils/GetFormData.utils'
import { UserValidator } from '../../../validator/schemas/User.schema'
import { useRequestCode } from '../../mutation/auth/useRequestCode.mutation'
import { useVerifyCode } from '../../mutation/auth/useVerifyCode.mutation'
import { useCreateUser } from '../../mutation/user/useCreateUser.mutation'

function useSignup() {
	const [verifyCode, setVerifyCode] = useState(false)
	const requestCode = useRequestCode()
	const verifyCodeMutation = useVerifyCode()
	const createUser = useCreateUser()
	const [error, setError] = useState<string | null>(null)
	const formData = useRef({
		fullName: '',
		nickName: '',
		account: '',
		pwd: '',
	})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		const userInfo = {
			fullName: data.fullName,
			nickName: data.nickName,
			account: data.email,
			pwd: data.password,
		}

		try {
			console.log(userInfo)
			UserValidator({
				data: userInfo,
			})
		} catch (e) {
			console.log(e)
			setError((e as Error).message)
			return
		}

		await requestCode.mutateAsync({
			account: data.email,
		})

		setVerifyCode(true)
		formData.current = {
			fullName: data.fullName,
			nickName: data.nickName,
			account: data.email,
			pwd: data.password,
		}
	}

	const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		const res = await verifyCodeMutation.mutateAsync({
			code: data.code,
		})

		if (res) {
			await createUser.mutateAsync({
				fullName: formData.current.fullName,
				nickName: formData.current.nickName,
				pwd: formData.current.pwd,
			})
		}
	}

	return {
		handleSubmit,
		handleVerifyCode,
		verifyCode,
		error,
		requestCode,
		verifyCodeMutation,
		createUser,
	}
}

export default useSignup
