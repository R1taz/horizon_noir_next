'use client'

import Link from 'next/link'
import Logo from '@/app/assets/H O R I Z O N N O I R.svg'
import { useAuthStore } from '../model/useAuthStore'

const Header = () => {
	const isAuth = useAuthStore(state => state.isAuth)

	return (
		<header className='mt-[54px] w-full'>
			<nav className='flex items-center justify-between'>
				<Link className='text-300' href='/'>
					Главная
				</Link>
				<Link className='text-300' href='/catalog'>
					Каталог
				</Link>
				<Logo className='w-[380px] h-[40px]' alt='H O R I Z O N  N O I R' />
				<Link className='text-300' href='/services'>
					Услуги
				</Link>

				{isAuth && (
					<Link className='text-300' href='/profile'>
						Профиль
					</Link>
				)}

				{!isAuth && (
					<section className='flex gap-4'>
						<Link className='text-300' href='/login'>
							Войти
						</Link>
						<span>/</span>
						<Link className='text-300' href='/registration'>
							Зарегистрироваться
						</Link>
					</section>
				)}
			</nav>
		</header>
	)
}

export default Header
