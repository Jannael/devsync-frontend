import { ROUTES } from '../constant/Route.constant'
import { useLogout } from '../hook/mutation/auth/useLogout.mutation'
import Button from './ui/Button.ui'
import Form from './ui/Form.ui'
import P from './ui/P.ui'
import Title from './ui/Title.ui'

function Logout() {
	const logoutMutation = useLogout()

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		logoutMutation.mutate()
		window.location.href = ROUTES.LOGIN
	}

	return (
		<Form className='border-warning' onSubmit={onSubmit}>
			<Title>Logout</Title>
			<P>Are you sure you want to logout?</P>
			<Button block={false} type='submit' variant='destructive'>
				Logout
			</Button>
		</Form>
	)
}

export default Logout
