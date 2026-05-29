'use client'

import { useState } from 'react'
import { easeOut, motion } from 'framer-motion'
import ChangeEmailDialog from '@/app/src/features/change-email/ui/ChangeEmailDialog'
import ChangePasswordDialog from '@/app/src/features/change-password/ui/ChangePasswordDialog'

const rightVariants = {
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0 },
}

const leftVariants = {
	initial: { opacity: 0, x: -20 },
	animate: { opacity: 1, x: 0 },
}

const ChangeSecurity = () => {
	const [isEmailOpen, setIsEmailOpen] = useState(false)
	const [isPasswordOpen, setIsPasswordOpen] = useState(false)

	return (
		<>
			<section className='flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between mt-4'>
				<motion.button
					onClick={() => setIsEmailOpen(true)}
					variants={leftVariants}
					initial='initial'
					animate='animate'
					transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
					className='text-lg rounded-[8px] bg-700 text-accent text-center py-[0.2px] px-3 hover:bg-600 transition-colors'
				>
					Сменить Email
				</motion.button>
				<motion.button
					onClick={() => setIsPasswordOpen(true)}
					variants={rightVariants}
					initial='initial'
					animate='animate'
					transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
					className='text-lg rounded-[8px] bg-700 text-accent text-center py-[0.2px] px-3 hover:bg-600 transition-colors'
				>
					Сменить пароль
				</motion.button>
			</section>
			<ChangeEmailDialog isOpen={isEmailOpen} onClose={() => setIsEmailOpen(false)} />
			<ChangePasswordDialog isOpen={isPasswordOpen} onClose={() => setIsPasswordOpen(false)} />
		</>
	)
}

export default ChangeSecurity
