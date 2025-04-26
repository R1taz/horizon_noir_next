import { createActionsForRoleCatalog } from '@/app/helpers/createActionsForRoleCatalog'
import { ICar } from '@/app/interfaces/carsInterface'
import { UserRole } from '@/app/interfaces/userInterface'
import ButtonAction from '../../ui/ButtonAction'
import LinkAction from '../../ui/LinkAction'
import { useState } from 'react'
import removeCarImg from '../../../assets/removeCar.png'
import Image from 'next/image'
import { useRemoveCar } from '@/app/hooks/useCars'
import { useCarsStore } from '@/app/stores/useCarsStore'

type Props = ICar & { role: UserRole }

const Car = ({ car, photos, role }: Props) => {
	const [isEdit, setIsEdit] = useState(true)
	const { mutateAsync } = useRemoveCar()
	const removeCar = useCarsStore(state => state.removeCar)

	const actions = createActionsForRoleCatalog(role)

	const handleRemoveCar = async () => {
		try {
			await mutateAsync(car.id)
			removeCar(car.id)
		} catch (error) {
			console.log('Произошла ошибка:' + error)
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
				src={mainPhoto.url}
				alt='Фото автомобиля'
				className='rounded-[8px] h-[250px] object-cover'
			/>

			<h1 className='pt-3 pb-[0.5px] text-lg text-primary'>
				{car.brand} {car.model}
			</h1>

			<span className='text-secondary'>{car.manufacturer_date}</span>

			{actions.map((action, idx) => {
				if (action.type === 'a') return <LinkAction carId={car.id} label={action.label} key={idx} />
				if (action.type === 'button') {
					return <ButtonAction label={action.label} action={action.action!} key={idx} />
				}
			})}
		</article>
	)
}

export default Car
