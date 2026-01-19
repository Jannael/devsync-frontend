import type { ReactNode } from 'react'

export function FeatureItem({ children }: { children: ReactNode }) {
	return <li className='p-3 border-b-2'>{children}</li>
}
