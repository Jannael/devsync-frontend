import FormButton from './ui/FormButton'
import InputText from './ui/InputText'
import P from './ui/P'
import Title from './ui/Title'

function EnterCodeModal({ error }: { error: string | null }) {
	return (
		<>
			<Title>Verify account</Title>
			<P>Introduce your account</P>
			<InputText name='account' placeholder='example@gmail.com' />
			{error !== null && <P className='text-error text-center'>{error}</P>}
			<FormButton>Send code</FormButton>
		</>
	)
}

export default EnterCodeModal
