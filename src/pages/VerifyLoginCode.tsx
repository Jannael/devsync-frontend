import Form from '../components/ui/Form'
import Page from '../components/ui/Page'
import VerifyCodeModal from '../components/VerifyCodeModal'

function ValidateLoginCode() {
	return (
		<Page className='flex justify-center items-center'>
			<Form className='w-6/10 max-w-96'>
				<VerifyCodeModal />
			</Form>
		</Page>
	)
}

export default ValidateLoginCode
