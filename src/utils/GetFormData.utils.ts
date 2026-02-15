function GetFormData(e: React.FormEvent<HTMLFormElement>) {
	const formData = new FormData(e.currentTarget)
	const data = Object.fromEntries(
		Array.from(formData.entries()).map(([key, value]) => [key, value.toString()])
	)
	return data
}

export default GetFormData
