function Header({ children }: { children: React.ReactNode }) {
	return (
		<header className='flex flex-col sm:flex-row justify-between items-center w-full relative mt-4 md:mt-10 border-primary border py-6 sm:py-4 px-6 md:px-8 rounded-3xl sm:rounded-full mb-6 md:mb-10 gap-4 sm:gap-0'>
			{children}
		</header>
	)
}

export default Header
