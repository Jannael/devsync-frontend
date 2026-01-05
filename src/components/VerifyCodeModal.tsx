import FormButton from './ui/FormButton'
import InputText from './ui/InputText'
import P from './ui/P'
import Title from './ui/Title'

function VerifyCodeModal() {
	return (
		<>
			<Title className=''>Verify code</Title>
			<P className='w-full text-center mb-2'>
				We have send you a code to your email please verify it
			</P>
			<InputText className='w-full' placeholder='1234' />
			<FormButton className='w-5/10 mt-4'>Verify</FormButton>
		</>
	)
}

export default VerifyCodeModal
