import { useState } from 'react'
import { CheckIcon } from '../../Icon'
import Button from './Button.ui'
import Input from './Input.ui'
import Label from './Label.ui'

function FeaturesInput({
	features,
	setFeatures,
}: {
	features: string[]
	setFeatures: (features: string[]) => void
}) {
	const [feature, setFeature] = useState<string>('')

	const handleSave = () => {
		if (feature.trim() === '') return
		if (features.includes(feature)) return

		setFeatures([...features, feature])
		setFeature('')
	}
	const featuresItems = features.map((feature) => (
		<li
			className='flex items-center gap-2 border-b border-primary/30 py-1 truncate'
			key={feature}
		>
			<div className='size-8 text-primary'>
				<CheckIcon />
			</div>
			{feature}
		</li>
	))

	return (
		<div className='flex-1 border-primary border p-5 rounded-lg'>
			<div className='flex flex-col md:flex-row gap-3 items-end'>
				<div className='flex-1 w-full'>
					<Label id='features'>Features</Label>
					<Input
						className='mt-3'
						id='features'
						name='features'
						onChange={(e) => setFeature(e.target.value)}
						placeholder='feat: add login page'
						type='text'
						value={feature}
					/>
				</div>
				<Button
					block={false}
					className='w-full md:w-auto'
					onClick={handleSave}
					type='button'
				>
					Add
				</Button>
			</div>
			<ul className='flex flex-col gap-2 mt-3 overflow-y-auto h-84'>
				{featuresItems}
			</ul>
		</div>
	)
}
export default FeaturesInput
