import Label from './Label.ui'
import Select from './Select.ui'
import Textarea from './Textarea.ui'

function CodeInput() {
	return (
		<div className='flex-2 flex flex-col gap-3'>
			<div className='w-full flex justify-between items-center'>
				<Label id='code'>Code</Label>
				<Select id='language' onChange={() => {}} value='typescript'>
					<option value='typescript'>TypeScript</option>
					<option value='javascript'>JavaScript</option>
					<option value='python'>Python</option>
					<option value='java'>Java</option>
					<option value='c'>C</option>
				</Select>
			</div>
			<Textarea id='code' name='code' placeholder='console.log("Hello World")' />
		</div>
	)
}
export default CodeInput
