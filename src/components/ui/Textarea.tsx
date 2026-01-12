function Textarea({ className }: { className?: string }) {
	return (
		<textarea
			className={`${className} resize-none border-contrast/30 border-2 rounded-xl h-auto field-sizing-content p-2 max-h-24`}
			id=''
			name=''
		></textarea>
	)
}

export default Textarea
