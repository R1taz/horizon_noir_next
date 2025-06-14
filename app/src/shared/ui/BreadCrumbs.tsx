import Link from 'next/link'
import { easeInOut, easeOut, motion } from 'framer-motion'

const breadCrumbsVariants = {
	initial: { opacity: 0, x: -30 },
	animate: { opacity: 1, x: 0 },
}

const BreadCrumbs = () => {
	return (
		<motion.nav
			variants={breadCrumbsVariants}
			initial='initial'
			animate='animate'
			transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
			className='my-16 flex gap-4'
		>
			<Link href='/' className='text-600 text-xl sm:text-2xl'>
				Главная
			</Link>
			<span className='text-600 text-xl sm:text-2xl'>{'>'}</span>
			<span className='text-500 text-xl sm:text-2xl'>Каталог автомобилей</span>
		</motion.nav>
	)
}

export default BreadCrumbs
