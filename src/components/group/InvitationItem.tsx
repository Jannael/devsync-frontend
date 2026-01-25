function InvitationItem({
	name,
	color,
	onAccept,
	onReject,
}: {
	name: string
	color: string
	onAccept: () => void
	onReject: () => void
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
			<article
				className='
            flex flex-col
            min-w-2xs h-24 w-full
            cursor-pointer
          '
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
              flex justify-around
              items-center
            '
				>
					<p>{name}</p>
					<div className='flex gap-3'>
						<button
							className='bg-primary text-contrast px-3 py-1 rounded-full cursor-pointer'
							onClick={onAccept}
							type='button'
						>
							Accept
						</button>
						<button
							className='bg-error text-contrast px-3 py-1 rounded-full cursor-pointer'
							onClick={onReject}
							type='button'
						>
							Reject
						</button>
					</div>
				</div>
			</article>
		</div>
	)
}

export default InvitationItem
