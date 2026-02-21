import { Toaster as Sonner } from 'sonner'

function Toaster() {
	return (
		<Sonner
			position='bottom-right'
			toastOptions={{
				style: {
					background: 'var(--color-main)',
					color: 'var(--color-contrast)',
					border: '1px solid var(--color-shade)',
					fontFamily: 'var(--font-main)',
				},
				className: 'my-toast',
			}}
		/>
	)
}

export default Toaster
