'use client'

import { AnimatePresence, motion } from 'framer-motion'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useUserStore } from '../../model/useUserStore'
import { useAuthStore } from '../../model/useAuthStore'
import { IUserData, UserRole } from '@/app/interfaces/userInterface'

const variantsDiv = {
	initial: { opacity: 0 },
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
}

const variantsTitle = {
	initial: { scale: 0.95 },
	visible: { scale: 1 },
	hidden: { scale: 0.95 },
}

interface Props {
	data: IUserData & { role: UserRole; photo_url: string | null }
	children: React.ReactElement
}

const AnimateLayout = ({ children, data }: Props) => {
	const { role, ...userData } = data

	const [isLoading, setIsLoading] = useState(true)
	const [isVisible, setIsVisible] = useState(true)

	const setUser = useUserStore(state => state.setUser)
	const setAuthData = useAuthStore(state => state.setAuthData)

	useEffect(() => {
		setUser(userData)
		setAuthData(true, role)
		const timer = setTimeout(() => setIsVisible(false), 4000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<AnimatePresence mode='wait'>
			{isVisible && (
				<>
					<motion.div
						className='absolute flex justify-center items-center left-0 top-0 w-full h-full bg-900 z-10'
						initial='initial'
						animate='visible'
						exit='hidden'
						transition={{ duration: 0.4, ease: 'easeOut' }}
						variants={variantsDiv}
						onAnimationComplete={definition => {
							if (definition === 'hidden') {
								setIsLoading(false)
							}
						}}
					>
						<motion.h1
							variants={variantsTitle}
							transition={{ duration: 0.4, ease: 'easeOut' }}
							initial='initial'
							animate='visible'
							exit='hidden'
							className={styles.logoTitle}
						>
							HORIZON NOIR
						</motion.h1>
					</motion.div>
				</>
			)}
			{!isLoading && children}
		</AnimatePresence>
	)
}

export default AnimateLayout
