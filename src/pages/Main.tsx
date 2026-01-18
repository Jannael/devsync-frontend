import { useQuery } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { Toaster, toast } from 'sonner'
import Page from '../components/ui/Page'
import { CubePlus, DotsVertical, MenuIcon } from '../icons'
import queryKeys from '../queryKeys'
import { routesConst } from '../routes.constants'
import userModel from './../service/api/models/user/model'

function Main() {
	const { data, isError, error } = useQuery({
		queryFn: userModel.getGroup,
		queryKey: [queryKeys.groupsList],
		retry: 1,
	})

	if (isError) toast.error(error.message)

	return (
		<>
			<Page className='p-10'>
				<Toaster />
				<GroupContainer>
					{data?.result?.map(
						(group: { color: string; name: string; _id: string }) => {
							return (
								<GroupItem
									color={group.color}
									key={group._id}
									name={group.name}
									onClick={() => {
										window.location.href = `${routesConst.group}?groupId=${group._id}`
									}}
									onMenuClick={() => {
										window.location.href = `${routesConst.groupInfo}?groupId=${group._id}`
									}}
								/>
							)
						},
					)}
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

export function GroupItem({
	name,
	color,
	onClick,
	onMenuClick,
}: {
	name: string
	color: string
	onClick: () => void
	onMenuClick: () => void
}) {
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
				onClick={onClick}
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
			{/* Vertical dots */}
			<button
				className='
					p-1 m-1
					border-contrast border-2 rounded-full
					cursor-pointer
					absolute left-0 top-0
					bg-primary
				'
				onClick={onMenuClick}
				type='button'
			>
				<DotsVertical />
			</button>
		</div>
	)
}

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
