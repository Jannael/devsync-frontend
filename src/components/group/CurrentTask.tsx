import useCurrentTaskComponent from '../../hooks/components/useCurrentTaskComponent'
import EditableCode from '../EditableCode'
import EditableFeatures from '../EditableFeatures'
import EditableP from '../ui/EditableP'
import EditableTitle from './EditableTitle'

function CurrentTask({ currentTaskId }: { currentTaskId: string | undefined }) {
	const {
		handleUpdateCode,
		handleUpdateDescription,
		handleUpdateFeatures,
		handleUpdateTitle,
		features,
		setFeatures,
		setUpdateCode,
		setUpdateDescription,
		setUpdateFeatures,
		setUpdateTitle,
		updateCode,
		updateDescription,
		updateFeatures,
		updateTitle,
		isComplete,
		name,
		description,
		code,
	} = useCurrentTaskComponent({ currentTaskId })

	return (
		<section className='w-8/10 flex flex-col max-h-dvh h-dvh overflow-y-auto'>
			<article className='w-full h-5/10 flex flex-col p-3'>
				<EditableTitle
					handleUpdateTitle={handleUpdateTitle}
					isComplete={isComplete}
					name={name}
					setUpdateTitle={setUpdateTitle}
					updateTitle={updateTitle}
				/>
				<EditableP
					description={description}
					handleUpdateDescription={handleUpdateDescription}
					setUpdateDescription={setUpdateDescription}
					updateDescription={updateDescription}
				/>
			</article>
			<div className='flex w-full h-5/10 p-3 gap-3'>
				<EditableFeatures
					features={features}
					handleUpdateFeatures={handleUpdateFeatures}
					setFeatures={setFeatures}
					setUpdateFeatures={setUpdateFeatures}
					updateFeatures={updateFeatures}
				/>
				<EditableCode
					content={code}
					handleUpdateCode={handleUpdateCode}
					setUpdateCode={setUpdateCode}
					updateCode={updateCode}
				/>
			</div>
		</section>
	)
}

export default CurrentTask
