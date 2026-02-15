function Form({
	onSubmit,
}: {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) {
	return <form onSubmit={onSubmit}></form>
}

export default Form
