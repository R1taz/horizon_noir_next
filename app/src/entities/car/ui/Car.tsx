import Image from 'next/image'
import Link from 'next/link'
import { useCarsStore, useRemoveCar, removeCarImg, UserRole, ICar } from '../index'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/src/widgets/cars'
import { useQueryClient } from '@tanstack/react-query'
import EditCarTrigger from '@/app/src/features/edit-car/ui/EditCarTrigger'
import { Dispatch, SetStateAction, useState } from 'react'
import { easeOut, motion } from 'framer-motion'
import { useNotification } from '@/app/src/shared/hooks/useNotification'

const variantsCar = {
	initial: { y: 20, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	exit: { y: 20, opacity: 0 },
}

type Props = Omit<ICar, 'model'> & { role: UserRole }

const Car = ({ car, photos, role }: Props) => {
	const { setIsOpenNotification, setMessageNotification } = useNotification()

	const [isHovered, setIsHovered] = useState(false)

	const setAuthData = useAuthStore(state => state.setAuthData)
	const removeCar = useCarsStore(state => state.removeCar)

	const queryClient = useQueryClient()
	const { mutateAsync } = useRemoveCar()
	const router = useRouter()

	const handleRemoveCar = async () => {
		try {
			await mutateAsync(car.id)
			queryClient.invalidateQueries({ queryKey: ['cars'] })

			setIsOpenNotification(true)
			setMessageNotification('Автомобиль успешно удалён')

			removeCar(car.id)
		} catch (error) {
			if ((error as any)?.response?.status === 401) {
				setAuthData(false, 'no role')
				router.push('/login')
			}
		}
	}

	const mainPhoto = photos.find(photo => photo.main_photo === true)
	if (!mainPhoto) return <h3>Ошибка: Отсутствует фотография автомобиля</h3>

	return (
		<motion.article
			variants={variantsCar}
			initial='initial'
			animate='animate'
			transition={{ duration: 0.3, ease: easeOut }}
			className='flex flex-col'
		>
			<article
				className='relative w-full h-[250px] bg-600 rounded-[9px]'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Image
					src={removeCarImg}
					alt='Удалить автомобиль'
					className={`z-10 absolute right-3 top-3 w-[20px] h-[20px] cursor-pointer transition-opacity duration-200 ${
						isHovered ? 'opacity-100' : 'opacity-0'
					}`}
					onClick={handleRemoveCar}
				/>

				<Image
					src={process.env.NEXT_PUBLIC_BASE_BACKEND_URL + '/' + mainPhoto.url.replace(/\\/g, '/')}
					alt='Фото автомобиля'
					className={`rounded-[8px] object-cover w-[350px] h-[250px] transition-filter duration-200 ${
						isHovered ? '[filter:brightness(65%)]' : 'brightness-100'
					}`}
					width={350}
					height={250}
				/>
			</article>

			<h1 className='pt-3 pb-[0.5px] text-lg text-400'>
				{car.brand} {car.model}
			</h1>

			<span className='text-500'>{car.manufacturer_date}</span>

			{role !== UserRole.USER && <EditCarTrigger car={car} photos={photos} />}

			<Link
				href={`/catalog/${car.id}`}
				className='text-accent text-center w-full font-bold border-[2px] border-accent rounded-[5px] py-1 mt-2'
			>
				Подробнее
			</Link>
		</motion.article>
	)
}

export default Car
