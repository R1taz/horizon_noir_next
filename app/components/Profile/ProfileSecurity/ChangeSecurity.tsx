'use client'

import { easeOut, motion } from 'framer-motion'

const rightVariants = {
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0 },
}

const leftVariants = {
	initial: { opacity: 0, x: -20 },
	animate: { opacity: 1, x: 0 },
}

const ChangeSecurity = () => {
	return (
		<section className='flex justify-between mt-4'>
			<motion.button
				variants={leftVariants}
				initial='initial'
				animate='animate'
				transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
				className='text-lg rounded-[8px] bg-700 text-accent text-center py-[0.2px] px-3'
			>
				Сменить Email
			</motion.button>
			<motion.button
				variants={rightVariants}
				initial='initial'
				animate='animate'
				transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
				className='text-lg rounded-[8px] bg-700 text-accent text-center py-[0.2px] px-3'
			>
				Сменить пароль
			</motion.button>
		</section>
	)
}

export default ChangeSecurity
