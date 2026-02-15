import Button from '../ui/Button.ui'
import Form from '../ui/Form.ui'
import Input from '../ui/Input.ui'
import P from '../ui/P.ui'
import Title from '../ui/Title.ui'

function VerifyCode({
	onSubmit,
}: {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) {
	return (
		<Form onSubmit={onSubmit}>
			<Title>Verify code</Title>
			<P>We have sent you a code to your email please verify it</P>
			<Input name='code' placeholder='code' type='text' />
			<Button type='submit'>Verify</Button>
		</Form>
	)
}

export default VerifyCode
