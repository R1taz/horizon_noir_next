'use client'

import { useState } from 'react'
import Image from 'next/image'
import logo from '../../../assets/image.png'
import { useAuthStore } from '@/app/src/widgets/cars'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { formateDate } from '@/app/src/shared/lib/format/formatDate'
import { formatPhoneNumber } from '@/app/src/shared/lib/format/formatPhoneNumber'
import { roleTypeToRu } from '@/app/src/shared/lib/format/roleTypeToRu'
import ButtonDeleteAccount from '@/app/src/features/auth/ui/ButtonDeleteAccount'
import AvatarUploadDialog from '@/app/src/features/update-avatar/ui/AvatarUploadDialog'
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
	const [isAvatarOpen, setIsAvatarOpen] = useState(false)
	const user = useUserStore()
	const setUser = useUserStore(state => state.setUser)
	const userRole = useAuthStore(state => state.role)

	const avatarSrc = user.photo_url
		? `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/${user.photo_url.replace(/\\/g, '/')}`
		: null

	return (
		<motion.article
			variants={profileInfoVariants}
			initial='initial'
			animate='animate'
			transition={{ duration: 0.5, ease: easeOut }}
			className='mr-5 p-4 pb-0 bg-800 rounded-[8px] col-start-1 col-end-2 row-start-1 row-end-2 lg:row-end-3'
		>
			<button
				type='button'
				onClick={() => setIsAvatarOpen(true)}
				className='relative w-full aspect-square overflow-hidden rounded-t-[5px] group block cursor-pointer'
			>
				{avatarSrc ? (
					<Image
						src={avatarSrc}
						alt='Фото пользователя'
						fill
						className='object-cover'
						sizes='(max-width: 1024px) 100vw, 430px'
					/>
				) : (
					<Image
						src={logo}
						alt='Фото пользователя по умолчанию'
						fill
						className='object-cover'
						sizes='(max-width: 1024px) 100vw, 430px'
					/>
				)}
				<div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2'>
					<svg
						className='w-12 h-12 text-accent'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={1.5}
							d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
						/>
					</svg>
					<span className='text-accent text-lg font-bold'>Изменить</span>
				</div>
			</button>
			<AvatarUploadDialog isOpen={isAvatarOpen} onClose={() => setIsAvatarOpen(false)} />
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

				<div className='flex flex-col lg:flex-row justify-between py-4 border-b-[2px] border-b-600'>
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

				<div className='py-4 border-b border-b-[2px] border-b-600 flex items-center'>
					<motion.span
						variants={spanVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
						className='text-400 text-xl'
					>
						Количество предупреждений: {user.numberOfWarn}
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
