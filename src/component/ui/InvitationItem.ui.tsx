import { useAcceptInvitation } from '../../hook/mutation/invitation/useAcceptInvitation.mutation'
import { useRejectInvitation } from '../../hook/mutation/invitation/useRejectInvitation.mutation'
import { CheckIcon, XIcon } from '../../Icon'

function InvitationItem({ name, groupId }: { name: string; groupId: string }) {
	const AcceptMutation = useAcceptInvitation()
	const RejectMutation = useRejectInvitation()

	const handleAccept = () => {
		AcceptMutation.mutate({ groupId })
	}

	const handleReject = () => {
		RejectMutation.mutate({ groupId })
	}

	return (
		<div className='w-full flex items-center justify-between gap-2'>
			<p className='text-contrast/80 truncate flex-1'>{name}</p>
			<div className='flex items-center gap-2'>
				<button
					className='text-accent cursor-pointer size-8 flex items-center justify-center rounded-full hover:bg-accent/30'
					onClick={handleAccept}
					type='button'
				>
					<CheckIcon />
				</button>
				<button
					className='text-warning cursor-pointer size-8 flex items-center justify-center rounded-full hover:bg-warning/30'
					onClick={handleReject}
					type='button'
				>
					<XIcon />
				</button>
			</div>
		</div>
	)
}
export default InvitationItem
