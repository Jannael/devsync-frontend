import { Children, type ReactNode, useState } from 'react'
import { CaretDown, CaretUp } from '../icons'

function Wrapper({ children }: { children: ReactNode }) {
	const [hidden, setHidden] = useState(false)
	const childrenCount = Children.count(children)

	return (
		<div className={`${!hidden && 'mb-4'} h-fit`}>
			<button
				className='w-full border-contrast/80 border-2 p-2 rounded-sm flex justify-end cursor-pointer'
				onClick={() => setHidden(!hidden)}
				type='button'
			>
				{hidden ? <CaretDown /> : <CaretUp />}
			</button>
			<ul
				className='transition-all duration-500 '
				style={{
					height: hidden ? '0px' : `${childrenCount * 48}px`,
					maxHeight: '144px',
					overflowY: childrenCount * 48 > 144 ? 'scroll' : 'hidden',
				}}
			>
				{!hidden && children}
			</ul>
		</div>
	)
}

export function WrapperItem({ children }: { children?: ReactNode }) {
	return <li className='p-3 border-2 border-contrast/30 h-12'>{children}</li>
}

export default Wrapper
