import { useRef } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Edit } from '../icons'
import Button from './ui/Button'
import Textarea from './ui/Textarea'

function EditableCode({
	content,
	updateCode,
	setUpdateCode,
	handleUpdateCode,
}: {
	content: string | undefined
	updateCode: boolean
	setUpdateCode: React.Dispatch<React.SetStateAction<boolean>>
	handleUpdateCode: (val: string) => void
}) {
	const codeRef = useRef<HTMLTextAreaElement>(null)

	return (
		<div className='w-7/10 h-full p-3 relative'>
			{!updateCode ? (
				<>
					<SyntaxHighlighter
						customStyle={{
							height: '100%',
						}}
						language='javascript'
						style={dracula}
					>
						{content || 'function Hello() {}'}
					</SyntaxHighlighter>
					<Button
						className='absolute right-0 bottom-0 mr-5 mb-3.5 bg-primary'	
						onClick={() => setUpdateCode(true)}
					>
						<Edit />
					</Button>
				</>
			) : (
				<>
					<Textarea
						className='flex-1 size-full'
						placeholder='function Hello() {}'
						ref={codeRef}
						value={content || ''}
					/>
					<Button
						className='absolute right-0 bottom-0 m-5'
						onClick={() => handleUpdateCode(codeRef.current!.value)}
					>
						Save
					</Button>
				</>
			)}
		</div>
	)
}

export default EditableCode
