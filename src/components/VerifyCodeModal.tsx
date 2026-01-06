import FormButton from './ui/FormButton'
import InputText from './ui/InputText'
import Label from './ui/Label'
import P from './ui/P'
import Title from './ui/Title'

function VerifyCodeModal() {
	return (
		<>
			<Title className=''>Verify code</Title>
			<P className='w-full text-center mb-2'>
				We have send you a code to your email please verify it
			</P>
			<Label>
				Code
				<InputText className='w-full' name='code' placeholder='1234' />
			</Label>
			<FormButton className='mt-4'>Verify</FormButton>
		</>
	)
}

export default VerifyCodeModal
