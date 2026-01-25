import { FullMoon, Moon } from '../icons'
import { routesConst } from '../routes.constants'
import ButtonFloatingMenu from './ui/ButtonFloatingMenu'
import FloatingMenu from './ui/FloatingMenu'
import FloatingMenuLi from './ui/FloatingMenuLi'

function SettingsMenu({
	setIsOpenSettings,
	handleChangeTheme,
	changeTheme,
	handleDeleteUser,
	handleLogout,
}: {
	setIsOpenSettings: React.Dispatch<React.SetStateAction<boolean>>
	handleChangeTheme: () => void
	changeTheme: string
	handleDeleteUser: () => void
	handleLogout: () => void
}) {
	return (
		<FloatingMenu onOverlayClick={() => setIsOpenSettings(false)}>
			<div className='absolute top-0 right-0 m-12 bg-primary p-4 text-contrast border-2 border-contrast w-4/10 rounded-xl max-w-xl'>
				<h2 className='text-2xl border-b-2 pb-3'>Settings</h2>
				<ul className='p-2 flex flex-col gap-2'>
					<FloatingMenuLi className='p-3 justify-between'>
						Theme
						<button
							className='cursor-pointer'
							onClick={handleChangeTheme}
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
						<a
							className='w-full p-3'
							href={`${routesConst.verifyCode}?redirect=${routesConst.updateUser}`}
						>
							Update user
						</a>
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
						<ButtonFloatingMenu onClick={handleDeleteUser}>
							Delete account
						</ButtonFloatingMenu>
					</FloatingMenuLi>
					<FloatingMenuLi className='border-none hover:bg-transparent'>
						<ButtonFloatingMenu onClick={handleLogout}>
							Logout
						</ButtonFloatingMenu>
					</FloatingMenuLi>
				</ul>
			</div>
		</FloatingMenu>
	)
}

export default SettingsMenu
