'use client'

import { RegistrationData } from '@/app/src/features/auth/model/types'
import { useRegistration } from '@/app/src/features/auth/model/useRegistration'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

const page = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegistrationData>()

	const setUser = useUserStore(state => state.setUser)
	const { mutateAsync } = useRegistration()

	const router = useRouter()

	const onSubmit: SubmitHandler<RegistrationData> = async data => {
		const newUser = await mutateAsync(data)
		setUser(newUser)
		router.replace('/login')
	}

	return (
		<main className='grid grid-cols-[230px,auto] grid-rows-[150px,auto] mt-24 px-[90px]'>
			<h1
				style={{ letterSpacing: '2px' }}
				className='text-accent text-4xl font-semibold row-start-1 row-end-2 col-start-1 col-end-2'
			>
				ЗАРЕГИСТРИРОВАТЬСЯ
			</h1>

			<article className='row-start-2 row-end-3 col-start-2 col-end-3'>
				<p className='text-secondary text-xl'>
					Присоединяйтесь к нашему автосалону — это больше, чем просто покупка автомобиля.
				</p>
				<p className='text-secondary text-xl mt-5'>
					Регистрация откроет доступ к личному кабинету, где вы сможете сохранять понравившиеся
					модели, записываться на тест-драйвы, управлять своими заявками и получать индивидуальные
					предложения.
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-9 mt-16'>
					<input
						{...register('name', { required: 'Это поле не может быть пустым' })}
						placeholder='Имя'
						className='outline-none block w-[60%] text-secondary  bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3'
					/>
					{errors.name && <p>{errors.name.message}</p>}

					<input
						{...register('password', {
							required: 'Это поле не может быть пустым',
							minLength: { value: 8, message: 'Минимальная длина пароля 8 символов' },
						})}
						type='password'
						placeholder='Пароль'
						className='outline-none block w-[60%] text-secondary bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3'
					/>
					{errors.password && <p>{errors.password.message}</p>}

					<input
						{...register('email', {
							required: 'Это поле не может быть пустым',
							pattern: { value: /^\S+@\S+$/i, message: 'Некорректный email' },
						})}
						placeholder='Email'
						className='outline-none block w-[60%] text-secondary bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3'
					/>
					{errors.email && <p>{errors.email.message}</p>}

					<input
						{...register('phone_number', {
							required: 'Это поле не может быть пустым',
							pattern: { value: /^\+?\d[\d\s\-()]{9,14}$/, message: 'Некорректный номер телефона' },
						})}
						placeholder='Номер телефона'
						className='outline-none block w-[60%] text-secondary bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3'
					/>
					{errors.phone_number && <p>{errors.phone_number.message}</p>}

					<div className='flex'>
						<input
							{...register('terms', { required: 'Вы должны согласиться с условиями' })}
							type='checkbox'
							className='outline-none rounded-[8px] w-[20px] h-[20px]'
						/>
						<label className='text-[#535353] ml-2 text-lg'>
							Согласен на обработку персональных данных
						</label>
						{errors.terms && <p>{errors.terms.message}</p>}
					</div>

					<button
						type='submit'
						className='outline-none mt-5 rounded-[5px] bg-accentBg font-bold text-xl text-[#333333] py-3 w-[320px]'
					>
						Зарегистрироваться
					</button>
				</form>

				<p className='my-7 text-[#535353] font-medium text-lg'>
					Аккаунт создан?
					<Link
						href='/login'
						className='cursor-pointer text-accent ml-4 py-[3px] border-b-[2px] border-b-accentBg font-bold'
					>
						Войти
					</Link>
				</p>
			</article>
		</main>
	)
}

export default page
