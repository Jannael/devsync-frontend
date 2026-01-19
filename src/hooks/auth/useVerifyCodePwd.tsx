import { useMutation } from '@tanstack/react-query'
import authModel from '../../service/api/models/auth/model'
import userModel from '../../service/api/models/user/model'

function useVerifyCodePwd(onSuccess: () => void) {
	const passwordVerifyCode = useMutation({
		mutationFn: async ({
			code,
			account,
			newPwd,
		}: {
			code: string
			account: string
			newPwd: string
		}) => {
			await authModel.passwordVerifyCode({ code, account, newPwd })
			await userModel.updatePassword({})
		},
		onSuccess,
	})
	return { passwordVerifyCode }
}

export default useVerifyCodePwd
