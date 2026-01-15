import FormButton from './ui/FormButton'
import InputText from './ui/InputText'
import Label from './ui/Label'
import P from './ui/P'
import Title from './ui/Title'

function VerifyCodeModal({
	name,
	description,
	error,
	blockSubmit,
}: {
	name?: string
	description?: string
	error: string | null
	blockSubmit: boolean
}) {
	return (
		<>
			<Title className=''>Verify code</Title>
			<P className='w-full mb-2 text-center'>
				{description !== undefined
					? description
					: 'We have send you a code to your email please verify it'}
			</P>
			<Label>
				Code
				<InputText
					className='w-full'
					name={name !== undefined ? name : 'code'}
					placeholder='1234'
				/>
			</Label>
			{error !== null && <P className='text-center text-error'>{error}</P>}
			<FormButton block={blockSubmit} className='mt-4'>
				Verify
			</FormButton>
		</>
	)
}

export default VerifyCodeModal
