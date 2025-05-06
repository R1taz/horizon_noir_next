import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCarsStore, useRemoveCar, removeCarImg, UserRole, ICar } from '../index'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/src/widgets/cars'
import { useQueryClient } from '@tanstack/react-query'

type Props = Omit<ICar, 'model'> & { role: UserRole }

const Car = ({ car, photos, role }: Props) => {
	const [isEdit, setIsEdit] = useState(true)

	const setAuthData = useAuthStore(state => state.setAuthData)
	const removeCar = useCarsStore(state => state.removeCar)

	const queryClient = useQueryClient()
	const { mutateAsync } = useRemoveCar()
	const router = useRouter()

	const handleRemoveCar = async () => {
		try {
			await mutateAsync(car.id)
			queryClient.invalidateQueries({ queryKey: ['cars'] })
			removeCar(car.id)
		} catch (error) {
			if ((error as any)?.response?.status === 401) {
				setAuthData(false, 'no role')
				router.push('/login')
			}
		}
	}

	// () => setIsEdit(prev => !prev)

	const mainPhoto = photos.find(photo => photo.main_photo === true)
	if (!mainPhoto) return <h3>Ошибка: Отсутствует фотография автомобиля</h3>

	return (
		<article className='relative flex flex-col'>
			{isEdit && (
				<Image
					src={removeCarImg}
					alt='Удалить автомобиль'
					className=' absolute right-3 top-3 w-[20px] h-[20px] cursor-pointer'
					onClick={handleRemoveCar}
				/>
			)}
			<img
				src={process.env.NEXT_PUBLIC_BASE_BACKEND_URL + '/' + mainPhoto.url.replace(/\\/g, '/')}
				alt='Фото автомобиля'
				className='rounded-[8px] h-[250px] object-cover'
			/>

			<h1 className='pt-3 pb-[0.5px] text-lg text-primary'>
				{car.brand} {car.model}
			</h1>

			<span className='text-secondary'>{car.manufacturer_date}</span>

			{role !== UserRole.USER && (
				<button className='text-[#333333] bg-accentBg text-center w-full font-bold rounded-[5px] py-1 mt-4'>
					Редактировать
				</button>
			)}

			<Link
				href={`/catalog/${car.id}`}
				className='text-accent text-center w-full font-bold border-[2px] border-accent rounded-[5px] py-1 mt-4'
			>
				Подробнее
			</Link>
		</article>
	)
}

export default Car
