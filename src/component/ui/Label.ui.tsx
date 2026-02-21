function Label({ id, children }: { id: string; children: React.ReactNode }) {
	return (
		<label className='text-sm font-medium' htmlFor={id}>
			{children}
		</label>
	)
}

export default Label
