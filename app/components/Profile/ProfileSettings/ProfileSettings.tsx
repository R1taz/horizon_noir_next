'use client'

import { easeOut, motion } from 'framer-motion'

const profileSettingsVariants = {
	initial: { opacity: 0, y: -40 },
	animate: { opacity: 1, y: 0 },
}

const rightVariants = {
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0 },
}

const leftVariants = {
	initial: { opacity: 0, x: -20 },
	animate: { opacity: 1, x: 0 },
}

const topVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
}

const ProfileSettings = () => {
	return (
		<motion.article
			variants={profileSettingsVariants}
			initial='initial'
			animate='animate'
			transition={{ duration: 0.5, ease: easeOut }}
			className='bg-800 rounded-[8px] px-5 py-3 col-start-2 col-end-3 row-start-1 row-end-2'
		>
			<header className='py-1 flex justify-between relative'>
				<motion.h2
					variants={leftVariants}
					initial='initial'
					animate='animate'
					transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
					className='text-2xl font-medium text-400'
				>
					Настройки
				</motion.h2>
				<motion.span
					variants={rightVariants}
					initial='initial'
					animate='animate'
					transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
					className='text-xl'
				>
					Переключатель темы
				</motion.span>
			</header>

			<div className='my-2 relative'>
				<div className='w-full h-[2px] bg-600'></div>
			</div>

			<article className='my-4'>
				<motion.h3
					variants={topVariants}
					initial='initial'
					animate='animate'
					transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
					className='text-400'
				>
					Уведомления
				</motion.h3>
				<div className='flex items-center my-2 gap-3'>
					<motion.div
						variants={leftVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
						className='bg-700 rounded-[6px] w-[25px] h-[25px] my-1'
					></motion.div>
					<motion.span
						variants={topVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
						className='text-400'
					>
						Присылать уведомления на Email
					</motion.span>
				</div>

				<div className='flex items-center my-2 gap-3'>
					<motion.div
						variants={leftVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
						className='bg-accent rounded-[6px] w-[25px] h-[25px] my-1'
					></motion.div>
					<motion.span
						variants={topVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
						className='text-400'
					>
						Присылать уведомления по SMS
					</motion.span>
				</div>
			</article>

			<article className='mt-6 mb-12'>
				<motion.h3
					variants={topVariants}
					initial='initial'
					animate='animate'
					transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
					className='text-400'
				>
					Язык
				</motion.h3>
				<div className='flex items-center my-2 gap-3'>
					<motion.div
						variants={leftVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
						className='bg-accent rounded-[50%] w-[25px] h-[25px] my-1'
					></motion.div>
					<motion.span
						variants={topVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
						className='text-400'
					>
						Русский
					</motion.span>
				</div>

				<div className='flex items-center my-2 gap-3'>
					<motion.div
						variants={leftVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
						className='bg-700 rounded-[50%] w-[25px] h-[25px]'
					></motion.div>
					<motion.span
						variants={topVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
						className='text-400'
					>
						English
					</motion.span>
				</div>
			</article>
		</motion.article>
	)
}

export default ProfileSettings
