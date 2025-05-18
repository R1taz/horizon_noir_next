'use client'

import { useAuthStore } from '@/app/src/widgets/cars'
import { useDeleteAccount } from '../model/useDeleteAccount'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { easeOut, motion } from 'framer-motion'

const ButtonDeleteAccount = ({ userId }: { userId: number }) => {
	const { mutateAsync } = useDeleteAccount()
	const setUser = useUserStore(state => state.setUser)
	const setAuthData = useAuthStore(state => state.setAuthData)
	const setInitialized = useAuthStore(state => state.setInitialized)

	const router = useRouter()

	const handleDelete = async () => {
		try {
			await mutateAsync(userId)
			setAuthData(false, null)
			setUser(null)
			setInitialized(false)
			router.replace('/')
		} catch (error) {
			if ((error as any)?.response?.status === 401) {
				setAuthData(false, null)
				router.replace('/login')
			}
		}
	}

	return (
		<motion.button
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
			onClick={handleDelete}
			className='bg-700 font-bold text-lg py-[5px] text-accent rounded-[8px] block'
		>
			Удалить аккаунт
		</motion.button>
	)
}

export default ButtonDeleteAccount
