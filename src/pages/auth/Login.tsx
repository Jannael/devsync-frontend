import { Link } from 'react-router'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useLoginComponent from '../../hooks/components/useLoginComponent'
import { routesConst } from '../../routes.constants'

function Login() {
	const { handleSubmit, error, requestRefreshTokenCode } = useLoginComponent()

	return (
		<Page className='flex justify-center items-center'>
			<Form className='w-6/10 max-w-96' onSubmit={handleSubmit}>
				<Title className='mb-4'>Login</Title>
				<Label>
					Account
					<InputText
						className='w-full'
						name='account'
						placeholder='example@gmail.com'
						required
					/>
				</Label>
				<Label>
					Password
					<InputText
						className='w-full'
						name='pwd'
						placeholder='my secret password'
						required
					/>
				</Label>
				<FormButton block={requestRefreshTokenCode.isPending} className='mt-4'>
					Login
				</FormButton>
				{error !== null && (
					<P className='w-full text-error text-center'>{error}</P>
				)}
				{requestRefreshTokenCode.isError && (
					<P className='w-full text-error text-center'>
						{requestRefreshTokenCode.error.message}
					</P>
				)}
				<article
					className='
						flex flex-col
						w-full
						text-md text-left
						gap-2
					'
				>
					<Link to={`${routesConst.verifyCode}?redirect=${routesConst.signup}`}>
						New user?
					</Link>
					<Link to={routesConst.forgotPwd}>Forgot password?</Link>
				</article>
			</Form>
		</Page>
	)
}

export default Login
