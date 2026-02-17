import Button from '../ui/Button.ui'
import Form from '../ui/Form.ui'
import Input from '../ui/Input.ui'
import Label from '../ui/Label.ui'
import P from '../ui/P.ui'
import Title from '../ui/Title.ui'
import Warning from '../ui/Warning.ui'

function VerifyCode({
	onSubmit,
	block,
	error,
}: {
	block: boolean
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	error: string | null
}) {
	return (
		<Form onSubmit={onSubmit}>
			<Title>Verify code</Title>
			<P>We have sent you a code to your email please verify it</P>
			<Label id='code'>Code</Label>
			<Input id='code' name='code' placeholder='1234' type='text' />
			{error && <Warning message={error} />}
			<Button block={block} type='submit'>
				Verify
			</Button>
		</Form>
	)
}

export default VerifyCode
