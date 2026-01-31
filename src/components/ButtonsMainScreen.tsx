import { useState } from 'react'
import useButtonsScreenComponent from '../hooks/components/useButtonsScreenComponent'
import { CubePlus, SettingsIcon } from '../icons'
import AddGroupMenu from './AddGroupMenu'
import SettingsMenu from './SettingsMenu'

export function ButtonsScreen() {
	const [isOpenSettings, setIsOpenSettings] = useState(false)
	const [isOpenGroup, setIsOpenGroup] = useState(false)

	const {
		handleAddGroup,
		addGroupRef,
		changeTheme,
		handleLogout,
		handleChangeTheme,
		handleDeleteUser,
	} = useButtonsScreenComponent()

	return (
		<>
			<div>
				{isOpenSettings && (
					<SettingsMenu
						changeTheme={changeTheme!}
						handleChangeTheme={handleChangeTheme}
						handleDeleteUser={handleDeleteUser}
						handleLogout={handleLogout}
						setIsOpenSettings={setIsOpenSettings}
					/>
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
			<div>
				{isOpenGroup && (
					<AddGroupMenu
						addGroupRef={addGroupRef}
						handleAddGroup={handleAddGroup}
						setIsOpenGroup={setIsOpenGroup}
					/>
				)}
				<button
					className='
					w-10
					m-2 p-1
					border-contrast border-2 rounded-sm
					cursor-pointer
					right-0 bottom-0 fixed
					text-contrast
				'
					onClick={() => setIsOpenGroup(!isOpenGroup)}
					type='button'
				>
					<CubePlus />
				</button>
			</div>
		</>
	)
}
export default ButtonsScreen
