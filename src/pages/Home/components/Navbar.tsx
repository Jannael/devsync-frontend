import { useState } from 'react'
import { Link } from 'react-router'
import { FullMoon, Moon } from '../../../icons'
import { routesConst } from '../../../routes.constants'

function Navbar() {
	const currentTheme = localStorage.getItem('theme')
		? localStorage.getItem('theme')
		: window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	const [changeTheme, setChangeTheme] = useState(currentTheme)

	const handleChangeTheme = () => {
		const theme = changeTheme === 'dark' ? 'light' : 'dark'
		localStorage.setItem('theme', theme)
		document.documentElement.setAttribute('data-theme', theme)
		setChangeTheme(theme)
	}

	return (
		<nav className='text-contrast w-full max-w-7xl h-fit border-b p-4 flex justify-between items-center fixed top-0'>
			<header className='text-2xl'>Devsync</header>
			<div className='h-full flex gap-3'>
				<button
					className='cursor-pointer border-contrast border-2 rounded-full p-2'
					onClick={handleChangeTheme}
					type='button'
				>
					{!changeTheme || changeTheme === 'light' ? <FullMoon /> : <Moon />}
				</button>

				<ul className='flex gap-3 items-center'>
					<li>
						<Link
							className='px-3 py-2 border-contrast border-2 rounded-full'
							to={routesConst.login}
						>
							Login
						</Link>
					</li>
					<li>
						<Link
							className='px-3 py-2 border-contrast border-2 rounded-full'
							to={`${routesConst.verifyCode}?redirect=${routesConst.signup}`}
						>
							Signup
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
