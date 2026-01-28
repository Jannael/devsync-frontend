import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import EditableCode from '../components/EditableCode'
import EditableFeatures from '../components/EditableFeatures'
import Button from '../components/ui/Button'
import EditableP from '../components/ui/EditableP'
import useDeleteSolution from '../hooks/solveTask/useDeleteSolution'
import useSolution from '../hooks/solveTask/useSolution'
import useUpdateSolution from '../hooks/solveTask/useUpdateSolution'
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
	const queryClient = useQueryClient()

	const code = solution.data?.result.code?.content
	const { deleteSolution } = useDeleteSolution(() => {
		queryClient.invalidateQueries({ queryKey: [taskId] })
		setShowSolution(false)
	})
	const { updateSolution } = useUpdateSolution()

	if (solution.isError) {
		setShowSolution(false)
	}

	const handleUpdateDescription = (val: string) => {
		updateSolution.mutate({
			taskId,
			groupId,
			data: {
				description: val,
			},
		})
		setUpdateDescription(false)
	}

	const handleUpdateFeatures = () => {
		updateSolution.mutate({
			taskId,
			groupId,
			data: {
				feature: features,
			},
		})
		setUpdateFeatures(false)
	}

	const handleUpdateCode = (val: string) => {
		updateSolution.mutate({
			taskId,
			groupId,
			data: {
				code: {
					language: 'js',
					content: val,
				},
			},
		})
	}

	return (
		<section className='w-8/10 flex flex-col max-h-dvh h-dvh overflow-y-auto'>
			<article className='w-full h-5/10 flex flex-col p-3'>
				<div className='flex-1 flex justify-between items-center gap-3'>
					<Title>Solution by {solution.data?.result.user}</Title>
					<Button
						className='text-error border-error'
						onClick={() => {
							deleteSolution.mutate({
								taskId,
								groupId,
							})
						}}
					>
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
