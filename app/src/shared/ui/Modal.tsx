import { ReactNode, useEffect } from 'react'

interface Props {
	title: string
	options: { label: string; action: (params: unknown) => void }[]
	children: ReactNode
}

const Modal = ({ title, options, children }: Props) => {
	useEffect(() => {
		const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
		const originalPaddingRight = parseFloat(getComputedStyle(document.body).paddingRight)

		document.body.style.overflow = 'hidden'
		document.body.style.paddingRight = `${originalPaddingRight + scrollBarWidth}px`

		return () => {
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
		}
	}, [])

	return (
		<article className='fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center backdrop-blur-[2px] rounded-[8px]'>
			<article className='bg-quaternaryBg rounded-[8px] p-5 z-50 max-h-[95vh] w-[50%] overflow-y-auto'>
				<h1 className='text-accent text-2xl font-bold mt-1 mb-5'>{title}</h1>

				{children}

				<section className='flex flex-col gap-3 my-5'>
					{options.map((option, idx) => (
						<button
							key={option.label}
							className={`w-[50%] py-1 mx-auto text-xl font-bold ${
								idx === 0 ? 'bg-accentBg' : ''
							} ${idx === 1 ? 'border-2 border-accentBg' : ''} ${
								idx === 1 ? 'text-accent' : 'text-[#292929]'
							} rounded-[7px]`}
							onClick={option.action}
						>
							{option.label}
						</button>
					))}
				</section>
			</article>
		</article>
	)
}

export default Modal
