'use client'

import { useAuthStore } from '@/app/src/widgets/cars'
import React from 'react'
import { useLogout } from '../model/useLogout'
import { useRouter } from 'next/navigation'
import { motion, easeOut } from 'framer-motion'

const ButtonLogout = ({ setUser }: { setUser: (user: null) => void }) => {
	const setAuthData = useAuthStore(state => state.setAuthData)

	const router = useRouter()
	const { mutateAsync } = useLogout()

	const handleLogout = async () => {
		try {
			await mutateAsync()
			router.replace('/login')
			setAuthData(false, null)
			setUser(null)
		} catch (error) {
			if ((error as any)?.response?.status === 401) {
				setAuthData(false, null)
			}
		}
	}

	return (
		<motion.button
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
			onClick={handleLogout}
			className='bg-accent font-bold text-lg py-[5px] text-700 rounded-[8px] block'
		>
			Выйти из аккаунта
		</motion.button>
	)
}

export default ButtonLogout
