'use client'

import { useState } from 'react'
import { useAuthStore } from '@/app/src/widgets/cars'
import { useDeleteAccount } from '../model/useDeleteAccount'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { easeOut, motion } from 'framer-motion'
import { useQueryClient } from '@tanstack/react-query'
import Dialog from '@/app/src/shared/ui/Dialog'

const CONFIRM_WORD = 'УДАЛИТЬ'

const ButtonDeleteAccount = ({ userId }: { userId: number }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [confirm, setConfirm] = useState('')

	const { mutateAsync, isPending } = useDeleteAccount()
	const setUser = useUserStore(state => state.setUser)
	const setAuthData = useAuthStore(state => state.setAuthData)
	const router = useRouter()
	const queryClient = useQueryClient()

	const close = () => {
		if (isPending) return
		setIsOpen(false)
		setConfirm('')
	}

	const handleDelete = async () => {
		try {
			await mutateAsync(userId)
			setIsOpen(false)
			setConfirm('')
			setAuthData(false, null)
			setUser(null)
			queryClient.invalidateQueries({ queryKey: ['authMe'] })
			router.replace('/login')
		} catch (error) {
			if ((error as any)?.response?.status === 401) {
				setIsOpen(false)
				setConfirm('')
				setAuthData(false, null)
				queryClient.invalidateQueries({ queryKey: ['authMe'] })
				router.replace('/login')
			}
		}
	}

	const isConfirmed = confirm.trim().toUpperCase() === CONFIRM_WORD

	return (
		<>
			<motion.button
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
				onClick={() => setIsOpen(true)}
				className='bg-700 font-bold text-lg py-[5px] text-accent rounded-[8px] block'
			>
				Удалить аккаунт
			</motion.button>

			<Dialog isOpen={isOpen} onClose={close}>
				<h2 className='text-2xl font-bold text-accent mb-3'>Удалить аккаунт?</h2>
				<p className='text-500 mb-2'>
					Это действие необратимо. Все ваши заказы, бронирования и история будут удалены без
					возможности восстановления.
				</p>
				<p className='text-500 mb-4'>
					Для подтверждения введите слово{' '}
					<span className='text-accent font-bold'>«{CONFIRM_WORD}»</span> (регистр не важен):
				</p>
				<input
					type='text'
					value={confirm}
					onChange={e => setConfirm(e.target.value)}
					autoFocus
					placeholder={CONFIRM_WORD}
					className='w-full bg-900 text-400 border-b-2 border-b-600 text-lg px-4 py-2 mb-6 focus:border-b-accent outline-none transition-colors placeholder:text-600'
				/>
				<div className='flex gap-3 justify-end'>
					<button
						onClick={close}
						disabled={isPending}
						className='px-6 py-2 text-500 font-bold rounded-[8px] hover:text-400 transition-colors disabled:opacity-50'
					>
						Отмена
					</button>
					<button
						onClick={handleDelete}
						disabled={!isConfirmed || isPending}
						className='px-6 py-2 bg-accent text-700 font-bold rounded-[8px] disabled:opacity-30 disabled:cursor-not-allowed transition-opacity'
					>
						{isPending ? 'Удаление...' : 'Удалить'}
					</button>
				</div>
			</Dialog>
		</>
	)
}

export default ButtonDeleteAccount
