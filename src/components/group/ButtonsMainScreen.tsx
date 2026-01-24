import { useState } from 'react'
import useLogout from '../../hooks/user/useLogout'
import { CubePlus, FullMoon, Moon, SettingsIcon } from '../../icons'
import { routesConst } from '../../routes.constants'
import FloatingMenu from '../ui/FloatingMenu'
import FloatingMenuLi from '../ui/FloatingMenuLi'

// import GroupInfoField from './GroupInfoField'

function ButtonFloatingMenu({
	children,
	onClick,
}: {
	children: React.ReactNode
	onClick?: () => void
}) {
	return (
		<button
			className='border-error border w-full p-3 rounded-full text-error cursor-pointer'
			onClick={onClick}
			type='button'
		>
			{children}
		</button>
	)
}

export function ButtonsScreen() {
	const [isOpenSettings, setIsOpenSettings] = useState(false)
	const currentTheme = localStorage.getItem('theme')
		? localStorage.getItem('theme')
		: window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	const [changeTheme, setChangeTheme] = useState(currentTheme)
	const { logoutMutation } = useLogout(() => {
		window.location.href = routesConst.login
	})

	return (
		<>
			<div>
				{isOpenSettings && (
					<FloatingMenu onOverlayClick={() => setIsOpenSettings(false)}>
						<div className='absolute top-0 right-0 m-12 bg-primary p-4 text-contrast border-2 border-contrast w-3/10 rounded-xl'>
							<h2 className='text-2xl border-b-2 pb-3'>Settings</h2>
							<ul className='p-2 flex flex-col gap-2'>
								<FloatingMenuLi className='p-3 justify-between'>
									Theme
									<button
										className='cursor-pointer'
										onClick={() => {
											const theme = changeTheme === 'dark' ? 'light' : 'dark'
											localStorage.setItem('theme', theme)
											document.documentElement.setAttribute('data-theme', theme)
											setChangeTheme(theme)
										}}
										type='button'
									>
										{!changeTheme || changeTheme === 'light' ? (
											<FullMoon />
										) : (
											<Moon />
										)}
									</button>
								</FloatingMenuLi>
								<FloatingMenuLi>
									<a className='w-full p-3' href={routesConst.login}>
										Login
									</a>
								</FloatingMenuLi>
								<FloatingMenuLi>
									<a className='w-full p-3' href={routesConst.changeAccount}>
										Change account
									</a>
								</FloatingMenuLi>
								<FloatingMenuLi className='border-none hover:bg-transparent mt-5 mb-3'>
									<ButtonFloatingMenu
										onClick={() => {
											window.location.href = `${routesConst.verifyCode}?redirect=${routesConst.deleteAccount}`
										}}
									>
										Delete account
									</ButtonFloatingMenu>
								</FloatingMenuLi>
								<FloatingMenuLi className='border-none hover:bg-transparent'>
									<ButtonFloatingMenu onClick={() => {
										console.log('logout') 
										logoutMutation.mutate({})
									}}>
										Logout
									</ButtonFloatingMenu>
								</FloatingMenuLi>
							</ul>
						</div>
					</FloatingMenu>
				)}
				<button
					className='
					w-10
					m-2 p-1
					border-contrast border-2 rounded-sm
					cursor-pointer
					fixed top-0
					text-contrast
					right-0
				'
					onClick={() => setIsOpenSettings(!isOpenSettings)}
					type='button'
				>
					<SettingsIcon />
				</button>
			</div>

			<button
				className='
					w-10
					m-2 p-1
					border-contrast border-2 rounded-sm
					cursor-pointer
					right-0 bottom-0 fixed
					text-contrast
				'
				type='button'
			>
				<CubePlus />
			</button>
		</>
	)
}
export default ButtonsScreen
