import type { ReactNode } from 'react'
import Page from '../components/ui/Page'
import { DotsVertical } from '../icons'

function Main() {
	return (
		<Page>
			<GroupContainer>
				<GroupItem color='#f21' name='insane group' />
				<GroupItem color='#f21' name='insane group' />
				<GroupItem color='#f21' name='insane group' />
				<GroupItem color='#f21' name='insane group' />
				<GroupItem color='#f21' name='insane group' />
			</GroupContainer>
		</Page>
	)
}

export function GroupContainer({ children }: { children: ReactNode }) {
	return (
		<div className='flex flex-wrap w-full gap-4 justify-evenly items-start max-h-dvh overflow-y-auto p-4'>
			{children}
		</div>
	)
}

export function GroupItem({ name, color }: { name: string; color: string }) {
	return (
		<div className='flex-1 min-w-2xs bg-contrast h-24 relative'>
			<button className='min-w-2xs h-24 flex w-full flex-col cursor-pointer' type='button'>
				<div className='w-full h-14' style={{ background: color }}></div>
				<div className='text-primary text-xl font-main flex-1 p-1'>
					<p>{name}</p>
				</div>
			</button>
			<button className='absolute left-0 top-3 cursor-pointer' type='button'>
				<DotsVertical />
			</button>
		</div>
	)
}

export default Main
