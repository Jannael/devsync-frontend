import { Link as RouterLink } from 'react-router'

function Link({ children, to }: { children: React.ReactNode; to: string }) {
	return (
		<RouterLink
			className='flex text-xl justify-center items-center gap-2 text-txt py-2 rounded-full px-3 cursor-pointer bg-primary border-2 border-transparent hover:bg-shade hover:text-accent hover:border-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
			to={to}
		>
			{children}
		</RouterLink>
	)
}

export default Link
