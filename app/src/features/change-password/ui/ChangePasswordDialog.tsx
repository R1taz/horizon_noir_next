'use client'

import { useState } from 'react'
import Dialog from '@/app/src/shared/ui/Dialog'
import PasswordInput from '@/app/src/shared/ui/PasswordInput'
import { useChangePassword } from '../model/useChangePassword'

interface Props {
	isOpen: boolean
	onClose: () => void
}

const inputClass =
	'block w-full bg-900 text-400 border-b-2 border-b-600 text-lg px-4 py-2 mt-1 focus:border-b-accent outline-none transition-colors'

const ChangePasswordDialog = ({ isOpen, onClose }: Props) => {
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const { mutateAsync, isPending } = useChangePassword()

	const reset = () => {
		setCurrentPassword('')
		setNewPassword('')
		setConfirmPassword('')
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
		if (!currentPassword || !newPassword || !confirmPassword) {
			setError('Заполните все поля')
			return
		}
		if (newPassword.length < 8) {
			setError('Минимальная длина пароля — 8 символов')
			return
		}
		if (newPassword !== confirmPassword) {
			setError('Новый пароль и подтверждение не совпадают')
			return
		}
		if (newPassword === currentPassword) {
			setError('Новый пароль совпадает с текущим')
			return
		}
		try {
			await mutateAsync({ currentPassword, newPassword })
			setSuccess(true)
			setTimeout(() => {
				reset()
				onClose()
			}, 1500)
		} catch (err: any) {
			setError(err?.response?.data?.message || 'Не удалось сменить пароль')
		}
	}

	return (
		<Dialog isOpen={isOpen} onClose={handleClose}>
			<h2 className='text-2xl font-bold text-accent mb-4'>Сменить пароль</h2>

			{success ? (
				<div className='py-6 text-center'>
					<p className='text-accent text-lg font-bold mb-2'>Пароль успешно изменён</p>
					<p className='text-500'>Закрытие...</p>
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4 mb-6'>
						<label className='text-500'>
							Текущий пароль
							<PasswordInput
								value={currentPassword}
								onChange={e => setCurrentPassword(e.target.value)}
								autoFocus
								className={inputClass}
							/>
						</label>
						<label className='text-500'>
							Новый пароль (минимум 8 символов)
							<PasswordInput
								value={newPassword}
								onChange={e => setNewPassword(e.target.value)}
								className={inputClass}
							/>
						</label>
						<label className='text-500'>
							Подтвердите новый пароль
							<PasswordInput
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
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

export default ChangePasswordDialog
