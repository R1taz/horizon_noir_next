'use client'

import { useState } from 'react'
import Dialog from '@/app/src/shared/ui/Dialog'
import PasswordInput from '@/app/src/shared/ui/PasswordInput'
import { useChangeEmail } from '../model/useChangeEmail'
import { useUserStore } from '@/app/src/shared/model/useUserStore'

interface Props {
	isOpen: boolean
	onClose: () => void
}

const inputClass =
	'block w-full bg-900 text-400 border-b-2 border-b-600 text-lg px-4 py-2 mt-1 focus:border-b-accent outline-none transition-colors'

const ChangeEmailDialog = ({ isOpen, onClose }: Props) => {
	const [currentPassword, setCurrentPassword] = useState('')
	const [newEmail, setNewEmail] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const { mutateAsync, isPending } = useChangeEmail()
	const setUser = useUserStore(s => s.setUser)
	const currentEmail = useUserStore(s => s.email)

	const reset = () => {
		setCurrentPassword('')
		setNewEmail('')
		setError(null)
		setSuccess(false)
	}

	const handleClose = () => {
		if (isPending) return
		reset()
		onClose()
	}

	const handleSubmit = async (e?: React.FormEvent) => {
		e?.preventDefault()
		setError(null)
		if (!currentPassword || !newEmail) {
			setError('Заполните все поля')
			return
		}
		if (newEmail === currentEmail) {
			setError('Новый email совпадает с текущим')
			return
		}
		if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
			setError('Некорректный email')
			return
		}
		try {
			const updated = await mutateAsync({ currentPassword, newEmail })
			setUser(updated)
			setSuccess(true)
			setTimeout(() => {
				reset()
				onClose()
			}, 1500)
		} catch (err: any) {
			setError(err?.response?.data?.message || 'Не удалось сменить email')
		}
	}

	return (
		<Dialog isOpen={isOpen} onClose={handleClose}>
			<h2 className='text-2xl font-bold text-accent mb-4'>Сменить email</h2>
			<p className='text-500 mb-4'>
				Текущий: <span className='text-400'>{currentEmail}</span>
			</p>

			{success ? (
				<div className='py-6 text-center'>
					<p className='text-accent text-lg font-bold mb-2'>Email успешно изменён</p>
					<p className='text-500'>Закрытие...</p>
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4 mb-6'>
						<label className='text-500'>
							Новый email
							<input
								type='email'
								value={newEmail}
								onChange={e => setNewEmail(e.target.value)}
								autoFocus
								className={inputClass}
							/>
						</label>
						<label className='text-500'>
							Текущий пароль
							<PasswordInput
								value={currentPassword}
								onChange={e => setCurrentPassword(e.target.value)}
								className={inputClass}
							/>
						</label>
					</div>
					{error && <p className='text-red-400 text-sm mb-4'>{error}</p>}
					<div className='flex gap-3 justify-end'>
						<button
							type='button'
							onClick={handleClose}
							disabled={isPending}
							className='px-6 py-2 text-500 font-bold rounded-[8px] hover:text-400 transition-colors disabled:opacity-50'
						>
							Отмена
						</button>
						<button
							type='submit'
							disabled={isPending}
							className='px-6 py-2 bg-accent text-700 font-bold rounded-[8px] disabled:opacity-30 disabled:cursor-not-allowed'
						>
							{isPending ? 'Сохранение...' : 'Сохранить'}
						</button>
					</div>
				</form>
			)}
		</Dialog>
	)
}

export default ChangeEmailDialog
