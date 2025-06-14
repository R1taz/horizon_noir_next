'use client'

import ActiveSessions from './ActiveSessions'
import ChangeSecurity from './ChangeSecurity'
import { easeOut, motion } from 'framer-motion'

const profileSecurityVariants = {
	initial: { opacity: 0, x: 40 },
	animate: { opacity: 1, x: 0 },
}

const leftVariants = {
	initial: { opacity: 0, x: -20 },
	animate: { opacity: 1, x: 0 },
}

const ProfileSecurity = () => {
	return (
		<motion.article
			variants={profileSecurityVariants}
			initial='initial'
			animate='animate'
			transition={{ duration: 0.5, ease: easeOut }}
			className='bg-800 rounded-[8px] px-5 py-3 col-start-1 col-end-2 lg:col-start-3 lg:col-end-4 row-start-3 row-end-4 lg:row-start-1 lg:row-end-2'
		>
			<header className='py-1 relative'>
				<motion.h2
					variants={leftVariants}
					initial='initial'
					animate='animate'
					transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
					className='text-2xl font-medium text-400'
				>
					Безопасность
				</motion.h2>
			</header>

			<div className='my-2 relative'>
				<div className='w-full h-[2px] bg-600'></div>
			</div>

			<ChangeSecurity />
			<ActiveSessions />
		</motion.article>
	)
}

export default ProfileSecurity
