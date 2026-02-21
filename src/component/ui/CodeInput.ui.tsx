import Label from './Label.ui'
import Select from './Select.ui'
import Textarea from './Textarea.ui'

const languages = [
	{ value: 'typescript', label: 'TypeScript' },
	{ value: 'javascript', label: 'JavaScript' },
	{ value: 'python', label: 'Python' },
	{ value: 'java', label: 'Java' },
	{ value: 'c', label: 'C' },
]

function CodeInput({
	language,
	content,
}: {
	language?: string
	content?: string
}) {
	const languageOptions = languages.map((language) => (
		<option key={language.value} value={language.value}>
			{language.label}
		</option>
	))

	return (
		<div className='flex-2 flex flex-col gap-3'>
			<div className='w-full flex justify-between items-center'>
				<Label id='code'>Code</Label>
				<div className='flex items-center gap-2'>
					<Label id='language'>Language</Label>
					<Select
						id='language'
						onChange={() => {}}
						value={language || 'typescript'}
					>
						{languageOptions}
					</Select>
				</div>
			</div>
			<Textarea
				id='code'
				name='code'
				placeholder='console.log("Hello World")'
				value={content}
			/>
		</div>
	)
}
export default CodeInput
