function Li({ children }: { children: React.ReactNode }) {
	return (
		<li className='flex [&>svg]:text-emerald-700/50 gap-3 text-xl'>
			{children}
		</li>
	)
}
export default Li
