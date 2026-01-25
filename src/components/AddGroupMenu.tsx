import { routesConst } from '../routes.constants'
import Button from './ui/Button'
import FloatingMenu from './ui/FloatingMenu'
import FloatingMenuLi from './ui/FloatingMenuLi'
import InputText from './ui/InputText'
import Label from './ui/Label'

function AddGroupsMenu({
	setIsOpenGroup,
	addGroupRef,
	handleAddGroup,
}: {
	setIsOpenGroup: React.Dispatch<React.SetStateAction<boolean>>
	addGroupRef: React.RefObject<HTMLInputElement | null>
	handleAddGroup: () => void
}) {
	return (
		<FloatingMenu onOverlayClick={() => setIsOpenGroup(false)}>
			<div className='absolute bottom-0 right-0 m-12 bg-primary p-4 text-contrast border-2 border-contrast w-4/10 rounded-xl max-w-xl'>
				<ul>
					<FloatingMenuLi>
						<a className='w-full p-3' href={routesConst.createGroup}>
							Create group
						</a>
					</FloatingMenuLi>
					<FloatingMenuLi className='p-3 hover:bg-transparent items-end gap-2'>
						<Label>
							Add Group
							<InputText placeholder='12abccccc...' ref={addGroupRef} />
						</Label>
						<Button onClick={handleAddGroup}>Add</Button>
					</FloatingMenuLi>
				</ul>
			</div>
		</FloatingMenu>
	)
}
export default AddGroupsMenu
