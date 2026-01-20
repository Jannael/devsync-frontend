function ValidateFromSchema({
	formEvent,
	validator,
	setError,
}: {
	formEvent: React.FormEvent<HTMLFormElement>
	validator: (data: Record<string, string>) => true | string
	setError: React.Dispatch<React.SetStateAction<string | null>>
}): Record<string, string> | undefined {
	formEvent.preventDefault()
	setError(null)

	const formData = new FormData(formEvent.currentTarget)
	const data = Object.fromEntries(formData.entries()) as Record<string, string>
	const isValid = validator(data as Record<string, string>)

	if (typeof isValid === 'string') {
		setError(isValid)
		return
	}

	return data
}

export default ValidateFromSchema
