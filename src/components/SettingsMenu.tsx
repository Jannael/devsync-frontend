import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import useUpdateUser from '../hooks/user/useUpdateUser'
import useUser from '../hooks/user/useUser'
import { FullMoon, Moon } from '../icons'
import queryKeys from '../queryKeys'
import { routesConst } from '../routes.constants'
import GroupInfoField from './group/GroupInfoField'
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
	const [searchParams] = useSearchParams()
	const updateUserParam = searchParams.get('updateUser')
	const { data: user } = useUser()
	const queryClient = useQueryClient()
	const { updateUser } = useUpdateUser(() => {
		queryClient.invalidateQueries({ queryKey: [queryKeys.user] })
		window.location.href = routesConst.main
	})

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
					{updateUserParam ? (
						<FloatingMenuLi className='flex-col p-3'>
							<span className='w-full border-b pb-3'> Update </span>
							<GroupInfoField
								field='fullName'
								fieldValue={user?.result?.fullName}
								onSave={(val) => {
									updateUser.mutate({
										fullName: val,
										nickName: user?.result?.nickName,
									})
								}}
								placeholder='Jon Doe Ramirez'
							/>
							<GroupInfoField
								field='nickName'
								fieldValue={user?.result?.nickName}
								onSave={(val) => {
									updateUser.mutate({
										fullName: user?.result?.fullName,
										nickName: val,
									})
								}}
								placeholder='Jon Doe Ramirez'
							/>
						</FloatingMenuLi>
					) : (
						<FloatingMenuLi>
							<a
								className='w-full p-3'
								href={`${routesConst.verifyCode}?redirect=${routesConst.main}&updateUser=true`}
							>
								Update user
							</a>
						</FloatingMenuLi>
					)}
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
