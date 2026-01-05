import { useState } from 'react'
import EnterCodeModal from '../components/EnterCodeModal'
import Form from '../components/ui/Form'
import Page from '../components/ui/Page'
import VerifyCodeModal from '../components/VerifyCodeModal'
import AccountValidator from '../service/AccountValidation'

function VerifyCode() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)

	return (
		<Page className='flex justify-center items-center'>
			{verifyCode ? (
				<Form>
					<VerifyCodeModal />
				</Form>
			) : (
				<Form
					onSubmit={(e) => {
						e.preventDefault()
						const formData = new FormData(e.currentTarget)
						const data = Object.fromEntries(formData.entries())
						const isValid = AccountValidator(data as Record<string, string>)

						if (typeof isValid === 'string') {
							setError(isValid)
							return
						}
						//todo request the code

						setVerifyCode(true)
					}}
				>
					<EnterCodeModal error={error} />
				</Form>
			)}
		</Page>
	)
}

export default VerifyCode
