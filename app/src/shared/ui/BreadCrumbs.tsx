import Link from 'next/link'

const BreadCrumbs = () => {
	return (
		<nav className='my-16 flex gap-4'>
			<Link href='/' className='text-[#535353] text-2xl'>
				Главная
			</Link>
			<span className='text-[#535353] text-2xl'>{'>'}</span>
			<span className='text-secondary text-2xl'>Каталог автомобилей</span>
		</nav>
	)
}

export default BreadCrumbs
