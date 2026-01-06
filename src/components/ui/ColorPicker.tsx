function ColorPicker({ className }: { className?: string }) {
	return (
		<input className={`${className} w-full cursor-pointer h-12`} type='color' />
	)
}

export default ColorPicker
