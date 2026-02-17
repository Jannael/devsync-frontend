function Header({ children }: { children: React.ReactNode }) {
	return (
		<header className='flex justify-between items-center w-full relative mt-10 border-primary border py-4 px-8 rounded-full mb-10'>
			{children}
		</header>
	)
}

export default Header
