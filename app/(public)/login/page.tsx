'use client'
import { useLogin } from '@/app/src/features/auth/model/useLogin'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useAuthStore } from '@/app/src/widgets/cars'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const page = () => {
	const setInitialized = useAuthStore(state => state.setInitialized)
	const setAuthData = useAuthStore(state => state.setAuthData)
	const setUser = useUserStore(state => state.setUser)

	const { mutateAsync } = useLogin()
	const router = useRouter()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleClick = async () => {
		try {
			const user = await mutateAsync({ email, password })
			setInitialized(true)
			setAuthData(true, user.role)
			console.log('ALOOO', user)
			setUser(user)
			router.push('/catalog')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main className='grid grid-cols-[230px,auto] grid-rows-[150px,auto] mt-24 px-[90px]'>
			<h1
				style={{ letterSpacing: '2px' }}
				className='text-accent text-4xl font-semibold row-start-1 row-end-2 col-start-1 col-end-2'
			>
				ВОЙТИ
			</h1>

			<article className='row-start-2 row-end-3 col-start-2 col-end-3'>
				<p className='text-secondary text-xl'>Спасибо, что выбрали наш автосалон!</p>
				<p className='text-secondary text-xl mt-5'>
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
						className='block w-[60%] text-secondary  bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3 outline-none'
					/>
					<input
						type='password'
						placeholder='Пароль'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='block w-[60%] text-secondary bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3 outline-none'
					/>
				</div>

				<p className='text-[#535353] mt-7 text-lg'>
					Забыли пароль?
					<span className='text-accent ml-4 py-[3px] font-bold border-b-[2px] border-b-accentBg'>
						Восстановить
					</span>
				</p>

				<button
					onClick={handleClick}
					className='my-8 rounded-[8px] bg-accentBg font-bold text-xl text-[#333333] py-2 w-[320px]'
				>
					Войти
				</button>

				<p className='my-4 text-[#535353] text-lg'>
					Нет аккаунта?
					<Link
						href='/registration'
						className='cursor-pointer text-accent ml-4 py-[3px] font-bold border-b-[2px] border-b-accentBg'
					>
						Пройдите регистрацию
					</Link>
				</p>
			</article>
		</main>
	)
}

export default page
