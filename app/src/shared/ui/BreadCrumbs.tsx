'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { easeOut, motion } from 'framer-motion'

const SEGMENT_LABELS: Record<string, string> = {
	catalog: 'Каталог автомобилей',
	profile: 'Личный кабинет',
	login: 'Вход',
	registration: 'Регистрация',
}

interface Props {
	current?: string
}

const BreadCrumbs = ({ current }: Props) => {
	const pathname = usePathname()
	const segments = pathname.split('/').filter(Boolean)

	const crumbs = segments.map((seg, i) => {
		const href = '/' + segments.slice(0, i + 1).join('/')
		const isLast = i === segments.length - 1
		const label =
			isLast && current ? current : SEGMENT_LABELS[seg] || decodeURIComponent(seg)
		return { href, label, isLast }
	})

	return (
		<motion.nav
			initial={{ opacity: 0, x: -30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
			className='my-16 flex gap-4 items-center flex-wrap'
		>
			<Link
				href='/'
				className='text-600 text-xl sm:text-2xl hover:text-accent transition-colors'
			>
				Главная
			</Link>
			{crumbs.map(c => (
				<span key={c.href} className='flex gap-4 items-center'>
					<span className='text-600 text-xl sm:text-2xl'>{'>'}</span>
					{c.isLast ? (
						<span className='text-500 text-xl sm:text-2xl'>{c.label}</span>
					) : (
						<Link
							href={c.href}
							className='text-600 text-xl sm:text-2xl hover:text-accent transition-colors'
						>
							{c.label}
						</Link>
					)}
				</span>
			))}
		</motion.nav>
	)
}

export default BreadCrumbs
