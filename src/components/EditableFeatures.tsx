import { Edit } from '../icons'
import { FeatureItem } from './group/FeatureItem'
import FeaturesInput from './group/FeaturesInput'
import Button from './ui/Button'

function EditableFeatures({
	updateFeatures,
	features,
	setUpdateFeatures,
	setFeatures,
	handleUpdateFeatures,
	edit,
}: {
	updateFeatures: boolean
	features: string[] | undefined
	setFeatures: React.Dispatch<React.SetStateAction<string[] | undefined>>
	setUpdateFeatures: React.Dispatch<React.SetStateAction<boolean>>
	handleUpdateFeatures: () => void
	edit?: boolean
}) {
	return (
		<div className='w-3/10 h-full overflow-y-auto border-r p-3'>
			{!updateFeatures ? (
				<>
					<header className=' flex justify-between items-center'>
						Features
						{edit && <Button onClick={() => setUpdateFeatures(true)}>
							<Edit />
						</Button>}
					</header>
					<ul className=''>
						{features?.map((feature: string) => {
							return <FeatureItem key={feature}> {feature} </FeatureItem>
						})}
					</ul>
				</>
			) : (
				<>
					<FeaturesInput features={features} setFeatures={setFeatures} />
					<Button className='w-full mt-3' onClick={handleUpdateFeatures}>
						Save
					</Button>
				</>
			)}
		</div>
	)
}

export default EditableFeatures
