import { AnimatePresence, easeOut, motion } from 'framer-motion'

const formVariants = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
}

interface Props {
	title: string
	description: string
	titleAction: string
	action: () => void
	children: React.ReactNode
}

const FormConsultation = ({ title, description, titleAction, action, children }: Props) => {
	return (
		<AnimatePresence mode='wait'>
			<motion.article
				variants={formVariants}
				initial='initial'
				transition={{ duration: 0.4, ease: easeOut }}
				viewport={{ once: true, amount: 0.3 }}
				whileInView='animate'
				className='my-24 w-[50%] mx-auto rounded-[8px] border-4 border-accent py-14'
			>
				<h1 className='text-300 text-4xl font-bold text-center'>{title}</h1>
				<p className='text-400 my-8 text-xl text-center'>{description}</p>
				{children}
				<button
					onClick={action}
					className='rounded-[8px] w-[85%] block mx-auto mt-10 mb-5 text-700 font-bold text-xl text-center bg-accent py-2'
				>
					{titleAction}
				</button>
			</motion.article>
		</AnimatePresence>
	)
}

export default FormConsultation
