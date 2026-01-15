import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Form from '../../components/ui/Form'
import Page from '../../components/ui/Page'
import VerifyCodeModal from '../../components/VerifyCodeModal'
import { routesConst } from '../../routes.constants'
import authModel from '../../service/api/models/auth/model'

function ValidateLoginCode() {
	const [error, setError] = useState<string | null>(null)
	const requestRefreshToken = useMutation({
		mutationFn: authModel.requestRefreshToken,
		onSuccess: () => {
			window.location.href = routesConst.main
		},
	})
	return (
		<Page className='flex justify-center items-center'>
			<Form
				className='w-6/10 max-w-96'
				onSubmit={async (e) => {
					e.preventDefault()
					const formData = new FormData(e.currentTarget)
					const data = Object.fromEntries(formData.entries())
					if (typeof Number(data.code) !== 'number') {
						setError('invalid code')
					}

					requestRefreshToken.mutate({ code: data.code.toString() })
				}}
			>
				<VerifyCodeModal
					blockSubmit={requestRefreshToken.isPending}
					error={
						requestRefreshToken.isError
							? requestRefreshToken.error.message
							: error
					}
				/>
			</Form>
		</Page>
	)
}

export default ValidateLoginCode
