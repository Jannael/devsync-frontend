import { useState } from 'react'
import Form from '../../components/ui/Form'
import Page from '../../components/ui/Page'
import VerifyCodeModal from '../../components/VerifyCodeModal'
import useRequestRefreshToken from '../../hooks/auth/useRequestRefreshToken'
import { routesConst } from '../../routes.constants'
import VerifyCode from '../../service/FormValidations/auth/VerifyCodeForm'

function ValidateLoginCode() {
	const [error, setError] = useState<string | null>(null)

	const { requestRefreshToken } = useRequestRefreshToken(() => {
		window.location.href = routesConst.main
	})

	return (
		<Page className='flex justify-center items-center'>
			<Form
				className='w-6/10 max-w-96'
				onSubmit={async (e) => {
					const data = VerifyCode(e, setError)
					if (!data) return

					requestRefreshToken.mutate({ code: data.code.toString() })
				}}
			>
				<VerifyCodeModal
					blockSubmit={requestRefreshToken.isPending}
					error={error}
				/>
			</Form>
		</Page>
	)
}

export default ValidateLoginCode
