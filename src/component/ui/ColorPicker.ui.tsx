import Label from './Label.ui'

function ColorPicker({
	colors,
	label,
	onClick,
	currentColor,
}: {
	colors: readonly string[]
	label: string
	onClick: (color: string) => void
	currentColor: string
}) {
	return (
		<div className='flex gap-2 justify-between'>
			<Label id={label}>{label}</Label>
			<div className='flex gap-2'>
				{colors.map((color) => (
					<button
						className={`w-8 h-8 rounded-full cursor-pointer border-2
						 ${currentColor === color ? 'border-contrast' : 'border-transparent'}`}
						id={label}
						key={color}
						onClick={() => onClick(color)}
						style={{ backgroundColor: color }}
						type='button'
					/>
				))}
			</div>
		</div>
	)
}

export default ColorPicker
