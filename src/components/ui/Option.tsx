import type { ReactNode } from 'react'

function Option({ children, value }: { children?: ReactNode; value?: string }) {
	return (
		<option className='bg-primary' value={value}>
			{children}
		</option>
	)
}

export default Option
