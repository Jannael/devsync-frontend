import { Children, type ReactNode, useState } from 'react'
import { CaretDown, CaretUp } from '../icons'

function Wrapper({
	children,
	title,
	className,
}: {
	children: ReactNode
	title?: string
	className?: string
}) {
	const [hidden, setHidden] = useState(false)
	const childrenCount = Children.count(children)

	return (
		<div className={`${className} h-fit`}>
			<button
				className={`
					flex
					w-full
					p-2
					border-contrast/80 border-2 rounded-sm
					cursor-pointer
					${title !== undefined ? 'justify-between' : 'justify-end'}
				`}
				onClick={() => setHidden(!hidden)}
				type='button'
			>
				{title}
				{hidden ? <CaretDown /> : <CaretUp />}
			</button>
			<ul
				className='transition-all duration-500'
				style={{
					height: hidden ? '0px' : `${childrenCount * 48}px`,
					maxHeight: '120px',
					overflowY: childrenCount * 48 > 120 ? 'scroll' : 'hidden',
				}}
			>
				{!hidden && children}
			</ul>
		</div>
	)
}

export function WrapperItem({
	children,
	className,
}: {
	children?: ReactNode
	className?: string
}) {
	return (
		<li className={`${className} h-12 p-3 border-2 border-contrast/30`}>
			{children}
		</li>
	)
}

export default Wrapper
