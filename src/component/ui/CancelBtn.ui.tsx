import Button from './Button.ui'

function CancelBtn({
	block,
	onClick,
	className,
}: {
	block: boolean
	onClick: () => void
	className?: string
}) {
	return (
		<Button
			block={block}
			className={`flex text-xl justify-center items-center gap-2 px-4 bg-warning hover:bg-warning/80 hover:text-txt hover:border-contrast ${className}`}
			onClick={onClick}
			type='button'
		>
			Cancel
		</Button>
	)
}

export default CancelBtn
