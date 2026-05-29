'use client'
import { useLogin } from '@/app/src/features/auth/model/useLogin'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useAuthStore } from '@/app/src/widgets/cars'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const page = () => {
	const setAuthData = useAuthStore(state => state.setAuthData)
	const setUser = useUserStore(state => state.setUser)

	const { mutateAsync, isPending } = useLogin()
	const router = useRouter()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)

	const handleClick = async () => {
		setError(null)
		if (!email || !password) {
			setError('Введите email и пароль')
			return
		}
		try {
			const user = await mutateAsync({ email, password })
			setAuthData(true, user.role)
			setUser(user)
			router.replace('/catalog')
		} catch (err: any) {
			setError(err?.response?.data?.message || 'Не удалось войти. Попробуйте ещё раз.')
		}
	}

	return (
		<main className='grid grid-cols-[230px,auto] grid-rows-[150px,auto] mt-24 mb-4 px-[90px]'>
			<h1
				style={{ letterSpacing: '2px' }}
				className='text-accent text-4xl font-semibold row-start-1 row-end-2 col-start-1 col-end-2'
			>
				ВОЙТИ
			</h1>

			<article className='row-start-2 row-end-3 col-start-2 col-end-3'>
				<p className='text-500 text-xl'>Спасибо, что выбрали наш автосалон!</p>
				<p className='text-500 text-xl mt-5'>
					Вход в личный кабинет откроет вам доступ ко всем возможностям платформы: отслеживание
					истории заявок, управление профилем, избранные автомобили, персональные предложения и
					многое другое.
				</p>

				<div className='flex flex-col gap-9 mt-16'>
					<input
						type='text'
						placeholder='Email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='block w-[60%] text-500  bg-transparent border-b-600 border-b-[2px] text-xl pb-3'
					/>
					<input
						type='password'
						placeholder='Пароль'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='block w-[60%] text-500 bg-transparent border-b-600 border-b-[2px] text-xl pb-3'
					/>
				</div>

				<p className='text-600 mt-7 text-lg'>
					Забыли пароль?
					<Link
						href='/'
						className='text-accent ml-4 py-[3px] font-bold border-b-[2px] border-b-accent'
					>
						Восстановить
					</Link>
				</p>

				<div className='mt-5 min-h-[28px]'>
					{error && <p className='text-red-400 text-lg font-medium'>{error}</p>}
				</div>

				<button
					onClick={handleClick}
					disabled={isPending}
					className='my-8 rounded-[8px] bg-accent font-bold text-xl text-700 py-2 w-[320px] disabled:opacity-50 disabled:cursor-not-allowed'
				>
					{isPending ? 'Вход...' : 'Войти'}
				</button>

				<p className='my-4 text-600 text-lg'>
					Нет аккаунта?
					<Link
						href='/registration'
						className='cursor-pointer text-accent ml-4 py-[3px] font-bold border-b-[2px] border-b-accent'
					>
						Пройдите регистрацию
					</Link>
				</p>
			</article>
		</main>
	)
}

export default page
