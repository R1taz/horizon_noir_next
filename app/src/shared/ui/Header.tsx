import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../assets/H O R I Z O N N O I R.svg'

const Header = () => {
	return (
		<header className='mt-[54px]'>
			<nav className='flex items-center justify-between'>
				<Link className='text-headlines' href='/'>
					Главная
				</Link>
				<Link className='text-headlines' href='/catalog'>
					Каталог
				</Link>
				<Image src={logo} alt='H O R I Z O N  N O I R' height={38} />
				<Link className='text-headlines' href='/services'>
					Услуги
				</Link>
				<Link className='text-headlines' href='/profile'>
					Профиль
				</Link>
			</nav>
		</header>
	)
}

export default Header
