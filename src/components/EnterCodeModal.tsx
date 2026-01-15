import FormButton from './ui/FormButton'
import InputText from './ui/InputText'
import Label from './ui/Label'
import P from './ui/P'
import Title from './ui/Title'

function EnterCodeModal({
	error,
	blockSubmit,
}: {
	error: string | null
	blockSubmit: boolean
}) {
	return (
		<>
			<Title>Verify account</Title>
			<P>Introduce your account</P>
			<Label>
				Account
				<InputText name='account' placeholder='example@gmail.com' />
			</Label>
			{error !== null && <P className='text-center text-error'>{error}</P>}
			<FormButton block={blockSubmit}>Send code</FormButton>
		</>
	)
}

export default EnterCodeModal
