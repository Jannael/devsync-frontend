import type { ReactNode } from 'react'
import Page from '../components/ui/Page'
import { CubePlus, DotsVertical, MenuIcon } from '../icons'

function Main() {
	return (
		<>
			<Page className='p-10'>
				<GroupContainer>
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
					<GroupItem color='#f21' name='insane group' />
				</GroupContainer>
			</Page>
			<ButtonsScreen />
		</>
	)
}

export default Main

export function GroupContainer({ children }: { children: ReactNode }) {
	return (
		<div
			className='
				flex flex-wrap
				w-full
				p-4
				gap-6 justify-evenly items-start
			'
		>
			{children}
		</div>
	)
}

export function GroupItem({ name, color }: { name: string; color: string }) {
	return (
		<div
			className='
				flex-1
				min-w-2xs h-24
				bg-contrast
				rounded-2xl
				shadow-sm shadow-contrast
				relative
			'
		>
			<button
				className='
					flex flex-col
					min-w-2xs h-24 w-full
					cursor-pointer
				'
				type='button'
			>
				<div
					className='
						w-full h-14
						rounded-tl-2xl rounded-tr-2xl
					'
					style={{ background: color }}
				></div>
				<div
					className='
						flex-1
						p-1
						text-primary text-xl font-main
					'
				>
					<p>{name}</p>
				</div>
			</button>
			<button
				className='
					p-1 m-1
					border-contrast border-2 rounded-full
					cursor-pointer
					absolute left-0 top-0
				'
				type='button'
			>
				<DotsVertical />
			</button>
		</div>
	)
}

export function ButtonsScreen() {
	return (
		<div
			className='
				flex
				w-full min-h-dvh
				text-contrast
				fixed top-0 justify-center
			'
		>
			<div className='max-w-7xl min-h-dvh w-full fixed'>
				<button
					className='
						w-10
						m-2 p-1
						border-contrast border-2 rounded-full
						cursor-pointer
						absolute right-0
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
						absolute right-0 bottom-0
					'
					type='button'
				>
					<CubePlus />
				</button>
			</div>
		</div>
	)
}
