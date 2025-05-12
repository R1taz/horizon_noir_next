'use client'

import Image from 'next/image'
import logo from '../../../assets/image.png'
import { useAuthStore } from '@/app/src/widgets/cars'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { formateDate } from '@/app/src/shared/lib/format/formatDate'
import { formatPhoneNumber } from '@/app/src/shared/lib/format/formatPhoneNumber'
import { roleTypeToRu } from '@/app/src/shared/lib/format/roleTypeToRu'
import ButtonDeleteAccount from '@/app/src/features/auth/ui/ButtonDeleteAccount'
import { easeOut, motion } from 'framer-motion'
import ButtonLogout from '@/app/src/features/auth/ui/ButtonLogout'

const profileInfoVariants = {
	initial: { opacity: 0, x: -40 },
	animate: { opacity: 1, x: 0 },
}

const titleVariants = {
	initial: { opacity: 0, x: -30 },
	animate: { opacity: 1, x: 0 },
}

const spanVariants = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
}

const ProfileInfo = () => {
	const user = useUserStore()
	const setUser = useUserStore(state => state.setUser)
	const userRole = useAuthStore(state => state.role)

	return (
		<motion.article
			variants={profileInfoVariants}
			initial='initial'
			animate='animate'
			transition={{ duration: 0.5, ease: easeOut }}
			className='mr-5 p-4 pb-0 bg-800 rounded-[8px] col-start-1 col-end-2 row-start-1 row-end-3'
		>
			<Image src={logo} alt='Фотография пользователя' className='rounded-t-[5px]' />
			<div className='h-[2px] bg-600'></div>

			<section className='px-5'>
				<div className='py-5'>
					<motion.h2
						variants={titleVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
						className='text-2xl font-medium text-400'
					>
						Мой профиль
					</motion.h2>
					<motion.p
						variants={titleVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
						className='py-2 text-500'
					>
						Зарегистрирован {formateDate(user.created_at!)}
					</motion.p>
				</div>

				<div className='flex justify-between py-4 border-b-[2px] border-b-600'>
					<motion.span
						variants={spanVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
						className='text-400 text-xl'
					>
						{user.name}
					</motion.span>
					<motion.span
						variants={spanVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
						className='text-400 text-xl'
					>
						{formatPhoneNumber(user.phoneNumber)}
					</motion.span>
				</div>

				<div className='py-4 border-b border-b-[2px] border-b-600 min-h-[30px] flex items-center'>
					<motion.span
						variants={spanVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
						className='text-400 text-xl'
					>
						{user.email}
					</motion.span>
				</div>

				<div className='py-4 border-b border-b-[2px] border-b-600 flex items-center'>
					<motion.span
						variants={spanVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
						className='text-400 text-xl'
					>
						{roleTypeToRu[userRole!]}
					</motion.span>
				</div>
			</section>

			<div className='flex flex-col gap-5 px-5 my-7'>
				<ButtonLogout setUser={setUser} />
				<ButtonDeleteAccount userId={user.id!} />
			</div>
		</motion.article>
	)
}

export default ProfileInfo
