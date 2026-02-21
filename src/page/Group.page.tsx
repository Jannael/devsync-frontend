import { toast } from 'sonner'
import GroupInvitationList from '../component/GroupInvitationList.component'
import MemberList from '../component/MemberList.component'
import InviteMemberModal from '../component/modal/InviteMember.modal'
import UpdateGroupInfo from '../component/UpdateGroupInfo.component'
import Button from '../component/ui/Button.ui'
import Header from '../component/ui/Header.ui'
import Link from '../component/ui/Link'
import Toaster from '../component/ui/Toaster.ui'
import Roles from '../constant/Roles.constant'
import { ROUTES } from '../constant/Route.constant'
import { useDeleteGroup } from '../hook/mutation/group/useDeleteGroup.mutation'
import { useQuitGroup } from '../hook/mutation/group/useQuitGroup.mutation'
import { useGetGroup } from '../hook/query/group/useGetGroup.query'
import { ArrowLeftIcon } from '../Icon'
import { useGroupStore } from '../store/Group.store'
import useMainStore from '../store/Main.store'

function GroupPage() {
	const currentRole = useMainStore((state) => state.currentRole)
	const currentGroup = useMainStore((state) => state.currentGroup)
	const deleteGroupMutation = useDeleteGroup()
	const quitGroupMutation = useQuitGroup()
	const { data: group } = useGetGroup(currentGroup ?? '')
	const showInviteMemberModal = useGroupStore(
		(state) => state.showInviteMemberModal,
	)

	const handleQuitGroup = async () => {
		const res = await quitGroupMutation.mutateAsync({
			groupId: currentGroup ?? '',
		})
		if (res) window.location.href = ROUTES.MAIN
	}

	const handleDeleteGroup = async () => {
		const res = await deleteGroupMutation.mutateAsync({
			groupId: currentGroup ?? '',
		})
		if (res) window.location.href = ROUTES.MAIN
	}

	return (
		<div className='min-h-dvh bg-main flex justify-center text-txt p-2 md:p-8 font-main'>
			<Toaster />
			<div className='w-full max-w-7xl'>
				<Header className='mb-6 md:mb-10'>
					<div className='flex flex-col gap-1 md:gap-2 items-center sm:items-start text-center sm:text-left'>
						<h1 className='text-3xl md:text-4xl font-bold'>Group Settings</h1>
						<h2
							className='text-txt/80'
							onClick={() => {
								navigator.clipboard.writeText(group?._id ?? '')
								toast.success('Copied')
							}}
						>
							{group?._id}
						</h2>
					</div>
					<div className='flex gap-2'>
						<Button
							block={quitGroupMutation.isPending}
							onClick={handleQuitGroup}
							type='button'
							variant='destructive'
						>
							Quit
						</Button>
						{currentRole === Roles.techLead && (
							<Button
								block={deleteGroupMutation.isPending}
								onClick={handleDeleteGroup}
								type='button'
								variant='destructive'
							>
								Delete
							</Button>
						)}
						<Link to={ROUTES.MAIN}>
							Back
							<ArrowLeftIcon />
						</Link>
					</div>
				</Header>
				<main className='flex gap-8 flex-col'>
					<UpdateGroupInfo />
					<MemberList />
					<GroupInvitationList />
				</main>
				{showInviteMemberModal && <InviteMemberModal />}
			</div>
		</div>
	)
}

export default GroupPage
