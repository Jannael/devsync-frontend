import EditableCode from '../components/EditableCode'
import EditableFeatures from '../components/EditableFeatures'
import Button from '../components/ui/Button'
import EditableP from '../components/ui/EditableP'
import useCurrentSolutionComponent from '../hooks/components/useCurrentSolutionComponent'
import Title from './ui/Title'

function CurrentSolution({
	taskId,
	groupId,
	setShowSolution,
}: {
	taskId: string
	groupId: string
	setShowSolution: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const {
		handleUpdateCode,
		handleUpdateDescription,
		handleUpdateFeatures,
		features,
		setFeatures,
		setUpdateCode,
		setUpdateDescription,
		setUpdateFeatures,
		updateCode,
		updateDescription,
		updateFeatures,
		handleDelete,
    solution,
    code
	} = useCurrentSolutionComponent({ taskId, groupId, setShowSolution })

	return (
		<section className='w-8/10 flex flex-col max-h-dvh h-dvh overflow-y-auto'>
			<article className='w-full h-5/10 flex flex-col p-3'>
				<div className='flex-1 flex justify-between items-center gap-3'>
					<Title>Solution by {solution.data?.result.user}</Title>
					<Button className='text-error border-error' onClick={handleDelete}>
						Delete
					</Button>
					<Button className='' onClick={() => setShowSolution(false)}>
						Task
					</Button>
				</div>
				<EditableP
					description={solution.data?.result.description}
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

export default CurrentSolution
