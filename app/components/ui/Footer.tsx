import Link from 'next/link'
import logo from '../../assets/H O R I Z O N N O I R.svg'
import Image from 'next/image'

const Footer = () => {
	return (
		<footer className='mt-[200px]'>
			<article className='grid grid-cols-[450px,500px,300px] grid-rows-[50px,280px,120px]'>
				<Image
					width={380}
					src={logo}
					alt='Логотип'
					className='col-start-1 col-end-2 row-start-1 row-end-2'
				/>
				<section className='col-start-2 col-end-3 row-start-2 row-end-3'>
					<span className='text-secondary'>Навигация</span>

					<section className='flex flex-col gap-2 mt-5'>
						<Link href='/' className='text-primary'>
							Главная
						</Link>
						<Link href='/catalog' className='text-primary'>
							Каталог
						</Link>
						<Link href='/services' className='text-primary'>
							Услуги
						</Link>
						<Link href='/profile' className='text-primary'>
							Профиль
						</Link>
					</section>
				</section>

				<section className='flex flex-col col-start-2 col-end-3 row-start-3 row-end-4'>
					<span className='text-secondary'>Адрес</span>
					<span className='text-primary mt-5'>ул. Новая Революция, 17, корпус Б, г. Москва</span>
				</section>

				<section className='flex flex-col gap-3 col-start-3 col-end-4 row-start-2 row-end-3'>
					<span className='text-primary'>info@horizon-noir.com</span>
					<span className='text-primary'>
						Вы также можете связаться с нами по электронной почте
					</span>
				</section>
			</article>

			<div className='my-2 relative'>
				<div className='absolute top-0 left-1/2 -ml-[50vw] w-screen h-[2px] bg-tertiaryBg'></div>
			</div>

			<div className='flex justify-between py-10 mb-10'>
				<span className='text-secondary'>Политика конфиденциальности</span>
				<span className='text-secondary'>Cookies</span>
			</div>
		</footer>
	)
}

export default Footer
