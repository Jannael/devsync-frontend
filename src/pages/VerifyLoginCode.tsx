import { useState } from 'react'
import Form from '../components/ui/Form'
import Page from '../components/ui/Page'
import VerifyCodeModal from '../components/VerifyCodeModal'
import { routesConst } from '../routes.constants'
import authModel from './../service/api/models/auth/model'

function ValidateLoginCode() {
	const [error, setError] = useState<string | null>(null)
	return (
		<Page className='flex justify-center items-center'>
			<Form
				className='w-6/10 max-w-96'
				onSubmit={async (e) => {
					e.preventDefault()
					const formData = new FormData(e.currentTarget)
					const data = Object.fromEntries(formData.entries())

					try {
						const res = await authModel.requestRefreshToken({
							code: data.code.toString(),
						})
						if (res.success !== true)
							throw { description: 'Something went wrong please try again' }
						window.location.href = routesConst.main
					} catch (e) {
						setError((e as Record<string, string>).description)
					}
				}}
			>
				<VerifyCodeModal error={error} />
			</Form>
		</Page>
	)
}

export default ValidateLoginCode
