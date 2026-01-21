import type { ReactNode } from 'react'
import { Edit } from '../../icons'
import Button from '../ui/Button'

function GroupInfoField({
	children,
	field,
	fieldValue,
	onSave,
}: {
	children?: ReactNode
	onSave?: () => void
	field?: string
	fieldValue?: string
}) {
	return (
		<div
			className='
				flex
				w-full h-14
				text-sm
				justify-between items-center
			'
		>
			<p
				className={`
					w-7/10
					text-sm
					${onSave !== undefined && 'border-r-2'}
				`}
			>{`${field} = ${fieldValue}`}</p>
			{children}
			{onSave !== undefined && (
				<div className='flex items-center just-center gap-3'>
					<button className='cursor-pointer' type='button'>
						<Edit />
					</button>
					<Button onClick={onSave}> Save</Button>
				</div>
			)}
		</div>
	)
}

export default GroupInfoField
