'use client'

import Link from 'next/link'
import Logo from '@/app/assets/H O R I Z O N N O I R.svg'
import { useAuthStore } from '../model/useAuthStore'

const Header = () => {
	const isAuth = useAuthStore(state => state.isAuth)

	return (
		<header className='mt-[54px] w-full z-10'>
			<nav className='flex flex-col lg:flex-row items-center justify-between'>
				<Link className='order-2 lg:order-1 text-300' href='/'>
					Главная
				</Link>

				<Link className='order-3 lg:order-2 text-300' href='/catalog'>
					Каталог
				</Link>

				<Logo
					className='order-1 lg:order-3 w-[200px] lg:w-[380px] h-[40px]'
					alt='H O R I Z O N  N O I R'
				/>

				<Link className='order-4 text-300' href='/services'>
					Услуги
				</Link>

				{isAuth && (
					<Link className='order-5 text-300' href='/profile'>
						Профиль
					</Link>
				)}

				{!isAuth && (
					<section className='order-5 flex gap-4'>
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
