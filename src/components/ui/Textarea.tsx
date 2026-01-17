function Textarea({ className, placeholder, name }: { className?: string, placeholder: string, name: string }) {
	return (
		<textarea
			className={`${className} resize-none border-contrast/30 border-2 rounded-xl h-auto field-sizing-content p-2 max-h-24`}
			name={name}
			placeholder={placeholder}
		></textarea>
	)
}

export default Textarea
