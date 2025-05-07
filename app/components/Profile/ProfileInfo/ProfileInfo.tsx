'use client'

import Image from 'next/image'
import logo from '../../../assets/image.png'
import { useAuthStore } from '@/app/src/widgets/cars'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useLogout } from '@/app/src/features/auth/model/useLogout'
import { useRouter } from 'next/navigation'
import { formateDate } from '@/app/src/shared/lib/format/formatDate'
import { formatPhoneNumber } from '@/app/src/shared/lib/format/formatPhoneNumber'
import { roleTypeToRu } from '@/app/src/shared/lib/format/roleTypeToRu'
import ButtonDeleteAccount from '@/app/src/features/auth/ui/ButtonDeleteAccount'

const ProfileInfo = () => {
	const user = useUserStore()
	const userRole = useAuthStore(state => state.role)
	const setAuthData = useAuthStore(state => state.setAuthData)

	const router = useRouter()

	const { mutateAsync } = useLogout()

	const handleLogout = async () => {
		try {
			await mutateAsync()
			setAuthData(false, 'no role')
			user.setUser(null)
			router.replace('/login')
		} catch (error) {
			if ((error as any)?.response?.status === 401) {
				setAuthData(false, 'no role')
				router.replace('/login')
			}
		}
	}

	return (
		<article className='mr-5 p-4 pb-0 bg-quaternaryBg rounded-[8px] col-start-1 col-end-2 row-start-1 row-end-3'>
			<Image src={logo} alt='Фотография пользователя' className='rounded-t-[5px]' />
			<div className='h-[2px] bg-tertiaryBg'></div>

			<section className='px-5'>
				<div className='py-5'>
					<h2 className='text-2xl font-medium text-primary'>Мой профиль</h2>
					<p className='py-2 text-secondary'>Зарегистрирован {formateDate(user.created_at!)}</p>
				</div>

				<div className='flex justify-between py-4 border-b-[2px] border-b-tertiaryBg'>
					<span className='text-primary text-xl'>{user.name}</span>
					<span className='text-primary text-xl'>{formatPhoneNumber(user.phoneNumber)}</span>
				</div>

				<div className='py-4 border-b border-b-[2px] border-b-tertiaryBg'>
					<span className='text-primary text-xl'>{user.email}</span>
				</div>

				<div className='py-4 border-b border-b-[2px] border-b-tertiaryBg'>
					<span className='text-primary text-xl'>{roleTypeToRu[userRole!]}</span>
				</div>
			</section>

			<div className='flex flex-col gap-5 px-5 my-7'>
				<button
					onClick={handleLogout}
					className='bg-accentBg font-bold text-lg py-[5px] text-[#333333] rounded-[8px] block'
				>
					Выйти из аккаунта
				</button>
				<ButtonDeleteAccount userId={user.id!} />
			</div>
		</article>
	)
}

export default ProfileInfo
