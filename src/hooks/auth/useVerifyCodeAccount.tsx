import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { routesConst } from '../../routes.constants'
import authModel from '../../service/api/models/auth/model'
import userModel from '../../service/api/models/user/model'

function useVerifyCodeAccount() {
	const verifyCodeAccount = useMutation({
		mutationFn: async ({
			codeCurrentAccount,
			codeNewAccount,
		}: {
			codeCurrentAccount: string
			codeNewAccount: string
		}) => {
			await authModel.accountVerifyCode({ codeCurrentAccount, codeNewAccount })
			await userModel.updateAccount({})
		},
		onSuccess: () => {
			window.location.href = routesConst.login
		},
	})
	if (verifyCodeAccount.isError) toast.error(verifyCodeAccount.error.message)
	return { verifyCodeAccount }
}

export default useVerifyCodeAccount
