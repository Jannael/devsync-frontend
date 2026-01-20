import { Toaster } from 'sonner'
import EnterCodeModal from '../../components/EnterCodeModal'
import Form from '../../components/ui/Form'
import Page from '../../components/ui/Page'
import VerifyCodeModal from '../../components/VerifyCodeModal'
import useVerifyCodeComponent from '../../hooks/components/useVerifyCodeComponent'

function VerifyCode() {
	const {
		verifyCode,
		error,
		requestCode,
		verifyCodeMutation,
		handleEnterCodeModal,
		handleVerifyCodeSubmit,
	} = useVerifyCodeComponent()

	return (
		<Page className='flex justify-center items-center'>
			<Toaster />
			{verifyCode ? (
				<Form className='w-6/10 max-w-96' onSubmit={handleVerifyCodeSubmit}>
					<VerifyCodeModal
						blockSubmit={verifyCodeMutation.isPending}
						error={
							verifyCodeMutation.isError
								? verifyCodeMutation.error.message
								: error
						}
					/>
				</Form>
			) : (
				<Form className='w-6/10 max-w-96' onSubmit={handleEnterCodeModal}>
					<EnterCodeModal blockSubmit={requestCode.isPending} error={error} />
				</Form>
			)}
		</Page>
	)
}

export default VerifyCode
