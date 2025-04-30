'use client'

import Image from 'next/image'
import logo from '../../../assets/image.png'
import { useAuthStore } from '@/app/src/widgets/cars'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useLogout } from '@/app/src/features/auth/model/useLogout'
import { useRouter } from 'next/navigation'
import { useGetProfile } from '@/app/src/features/get-profile/model/useGetProfile'
import { useEffect } from 'react'

const ProfileInfo = () => {
	const user = useUserStore()
	const userRole = useAuthStore(state => state.role)
	const isAuth = useAuthStore(state => state.isAuth)
	const setIsAuth = useAuthStore(state => state.setIsAuth)
	const setRole = useAuthStore(state => state.setRole)
	const setUser = useUserStore(state => state.setUser)

	const router = useRouter()

	const { data: profile, isLoading, error } = useGetProfile(user.id)
	const { mutateAsync } = useLogout()

	useEffect(() => {
		if (!profile) return
		setUser(profile)
	}, [profile])

	if (isLoading && !user.id) return <h1>Loading...</h1>

	if (error) {
		if (error.response?.status === 401) {
			router.push('/login')
			setIsAuth(false)
			setRole(null)
		}
	}

	const handleLogout = async () => {
		try {
			await mutateAsync()
			setIsAuth(false)
			setRole(null)
			user.setUser(null)
			router.replace('/login')
		} catch (error) {
			console.log(error)
			if (error.response?.status === 401) {
				setIsAuth(false)
				setRole(null)
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
					<p className='py-2 text-secondary'>Зарегистрирован {user.created_at}</p>
				</div>

				<div className='flex justify-between py-4 border-b-[2px] border-b-tertiaryBg'>
					<span className='text-primary text-xl'>{user.name}</span>
					<span className='text-primary text-xl'>{user.phoneNumber}</span>
				</div>

				<div className='py-4 border-b border-b-[2px] border-b-tertiaryBg'>
					<span className='text-primary text-xl'>{user.email}</span>
				</div>

				<div className='py-4 border-b border-b-[2px] border-b-tertiaryBg'>
					<span className='text-primary text-xl'>{userRole}</span>
				</div>
			</section>

			<div className='flex flex-col gap-5 px-5 my-7'>
				<button
					onClick={handleLogout}
					className='bg-accentBg font-bold text-lg py-[5px] text-[#333333] rounded-[8px] block'
				>
					Выйти из аккаунта
				</button>
				<button className='bg-secondaryBg font-bold text-lg py-[5px] text-accent rounded-[8px] block'>
					Удалить аккаунт
				</button>
			</div>
		</article>
	)
}

export default ProfileInfo
