import { useState } from 'react'
import EditableCode from '../components/EditableCode'
import EditableFeatures from '../components/EditableFeatures'
import Button from '../components/ui/Button'
import EditableP from '../components/ui/EditableP'
import useSolution from '../hooks/solveTask/useSolution'
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
	const solution = useSolution({ taskId, groupId })
	const [updateDescription, setUpdateDescription] = useState(false)
	const [features, setFeatures] = useState<string[] | undefined>()
	const [updateFeatures, setUpdateFeatures] = useState(false)
	const [updateCode, setUpdateCode] = useState(false)

	const code = solution.data?.result.code?.content

	return (
		<section className='w-8/10 flex flex-col max-h-dvh h-dvh overflow-y-auto'>
			<article className='w-full h-5/10 flex flex-col p-3'>
				<div className='flex-1 flex justify-between items-center'>
					<Title>Solution by {solution.data?.result.user}</Title>
					<Button onClick={() => setShowSolution(false)}>Show task</Button>
				</div>
				<EditableP
					description={solution.data?.result.description}
					handleUpdateDescription={() => {}}
					setUpdateDescription={setUpdateDescription}
					updateDescription={updateDescription}
				/>
			</article>
			<div className='flex w-full h-5/10 p-3 gap-3'>
				<EditableFeatures
					features={features}
					handleUpdateFeatures={() => {}}
					setFeatures={setFeatures}
					setUpdateFeatures={setUpdateFeatures}
					updateFeatures={updateFeatures}
				/>
				<EditableCode
					content={code}
					handleUpdateCode={() => {}}
					setUpdateCode={setUpdateCode}
					updateCode={updateCode}
				/>
			</div>
		</section>
	)
}

export default CurrentSolution
