import { CubePlus, MenuIcon } from '../../icons'

export function ButtonsScreen() {
	return (
		<>
			<button
				className='
					w-10
					m-2 p-1
					border-contrast border-2 rounded-full
					cursor-pointer
					fixed top-0
					text-contrast
					right-0
					
				'
				type='button'
			>
				<MenuIcon />
			</button>
			<button
				className='
					w-10
					m-2 p-1
					border-contrast border-2 rounded-full
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
