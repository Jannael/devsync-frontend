const thanks = [
	{
		label: 'Natali Chavez',
		href: 'https://www.instagram.com/nat.chavez18?utm_source=ig_web_button_share_sheet',
	},
	{
		label: 'Tabler icons',
		href: 'https://tablericons.com',
	},
	{
		label: 'Npmx',
		href: 'https://npmx.dev',
	},
	{
		label: 'Zustand',
		href: 'https://zustand-demo.pmnd.rs/',
	},
	{
		label: 'CubeDesk',
		href: 'https://cubedesk.io',
	},
	{
		label: 'Tailwindcss',
		href: 'https://tailwindcss.com',
	},
]

const personal = [
	{
		label: 'Github',
		href: 'https://github.com/jannael',
	},
	{
		label: '@JannaelCode',
		href: 'https://twitter.com/JannaelCode',
	},
	{
		label: 'Linkedin',
		href: 'https://www.linkedin.com/in/jannael-orlando-44604a349/',
	},
]

function Footer() {
	const personalItems = personal.map((personal) => {
		return (
			<li
				className='flex items-center gap-5 [&>svg]:text-shade text-2xl text-contrast/80 font-main font-bold'
				key={personal.label}
			>
				<a href={personal.href} rel='noopener' target='_blank'>
					{personal.label}
				</a>
			</li>
		)
	})

	const thanksItems = thanks.map((thank) => {
		return (
			<li
				className='flex items-center gap-5 [&>svg]:text-shade text-2xl text-contrast/80 font-main font-bold'
				key={thank.label}
			>
				<a href={thank.href} rel='noopener' target='_blank'>
					{thank.label}
				</a>
			</li>
		)
	})

	return (
		<footer className='w-full bg-shade flex flex-col justify-center items-center py-6 bottom-0'>
			<div>
				<ul className='flex gap-4 font-main text-xl border-b-2 py-5'>
					{thanksItems}
				</ul>
			</div>
			<div>
				<ul className='flex gap-4 font-main text-xl mt-3'>{personalItems}</ul>
			</div>
		</footer>
	)
}
export default Footer
