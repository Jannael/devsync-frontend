import { useRef, useState } from 'react'
import { ROUTES } from '../../../constant/Route.constant'
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
			UserValidator({
				data: userInfo,
			})
			const res = await requestCode.mutateAsync({
				account: data.email,
			})
			setError(null)
			if (res) setVerifyCode(true)
		} catch (e) {
			setError((e as Error).message)
			return
		}

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
		try {
			const res = await verifyCodeMutation.mutateAsync({
				code: data.code,
			})
			if (res) {
				const res = await createUser.mutateAsync({
					fullName: formData.current.fullName,
					nickName: formData.current.nickName,
					pwd: formData.current.pwd,
				})
				setError(null)
				if (res) window.location.href = ROUTES.MAIN
			}
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
		createUser,
	}
}

export default useSignup
