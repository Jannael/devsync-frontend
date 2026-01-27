import FeaturesInput from '../group/FeaturesInput'
import InputText from '../ui/InputText'
import Label from '../ui/Label'
import Textarea from '../ui/Textarea'

function CreateTaskRightSide({
	features,
	setFeatures,
}: {
	features: string[] | undefined
	setFeatures: React.Dispatch<React.SetStateAction<string[] | undefined>>
}) {
	return (
		<div className='flex-3 flex flex-col gap-3'>
			<Label>
				Name
				<InputText name='name' placeholder='validate inputs' />
			</Label>
			<Label>
				Description
				<Textarea
					className='min-h-24 max-h-24 h-auto'
					name='description'
					placeholder='there is an use when ...'
				/>
			</Label>
			<div className='flex w-full gap-3'>
				<FeaturesInput features={features} setFeatures={setFeatures} />
				<Label className='w-6/10'>
					Code
					<Textarea
						className='h-full max-h-24'
						name='code'
						placeholder='function hello() {}'
					></Textarea>
				</Label>
			</div>
		</div>
	)
}

export default CreateTaskRightSide
