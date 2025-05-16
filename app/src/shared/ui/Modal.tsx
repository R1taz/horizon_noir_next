import { ReactNode, useEffect } from 'react'
import { motion } from 'framer-motion'

const variantsModal = {
	initial: { y: 20, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	exit: { y: 20, opacity: 0 },
}

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
		<motion.article
			variants={variantsModal}
			initial='initial'
			animate='animate'
			exit='exit'
			transition={{
				duration: 0.3,
				ease: 'easeOut',
			}}
			className='fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center backdrop-blur-[2px] rounded-[8px]'
		>
			<article className='p-5 z-50 max-h-[95vh] w-[50%] overflow-y-auto overflow-x-hidden backdrop-blur-lg bg-600/20 border border-accent/20 rounded-[8px] shadow-lg'>
				<h1 className='text-accent text-2xl font-bold mt-1 mb-5'>{title}</h1>

				{children}

				<section className='flex flex-col gap-3 my-5'>
					{options.map((option, idx) => (
						<button
							key={option.label}
							className={`w-[50%] py-1 mx-auto text-xl font-bold ${idx === 0 ? 'bg-accent' : ''} ${
								idx === 1 ? 'border-2 border-accent' : ''
							} ${idx === 1 ? 'text-accent' : 'text-[800]'} rounded-[7px]`}
							onClick={option.action}
						>
							{option.label}
						</button>
					))}
				</section>
			</article>
		</motion.article>
	)
}

export default Modal
