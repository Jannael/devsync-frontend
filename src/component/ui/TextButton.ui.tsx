import P from './P.ui'

function TextButton({
	text,
	onClick,
	buttonText,
}: {
	text: string
	onClick: () => void
	buttonText: string
}) {
	return (
		<P>
			{text}
			<button
				className='text-primary hover:underline cursor-pointer'
				onClick={onClick}
				type='button'
			>
				{buttonText}
			</button>
		</P>
	)
}

export default TextButton
