import { ICar } from '@/app/interfaces/carsInterface'
import { bodyTypeToRu } from '@/app/src/shared/lib/format/bodyTypeToRu'
import { driveTypeToRu } from '@/app/src/shared/lib/format/driveTypeToRu'
import { formatPrice } from '@/app/src/shared/lib/format/formatPrice'

interface Props {
	car: ICar
}

const CarInfo = ({ car }: Props) => {
	const mainPhoto = car.photos.find(photo => photo.main_photo === true)

	if (!mainPhoto) return <h1>Отсутствует главная фотография</h1>

	return (
		<article>
			<div className='flex gap-8 h-[425px]'>
				{!mainPhoto && <h1 className='flex-1'>Отсутствует фотография</h1>}
				{mainPhoto && (
					<img
						className=' rounded-[8px] object-cover w-[50%] h-full'
						src={process.env.NEXT_PUBLIC_BASE_BACKEND_URL + '/' + mainPhoto.url.replace(/\\/g, '/')}
						alt='Главное фото автомобиля'
					/>
				)}
				<div className='flex flex-col gap-4'>
					<h1 className='text-headlines text-2xl'>
						{car.car.brand} {car.car.model}
					</h1>
					<span className='text-secondary text-xl'>Год выпуска: {car.car.manufacturer_date}</span>
					<span className='text-secondary text-xl'>
						Двигатель: {car.model.engine_volume} л. / {car.model.power} л.с. / {car.model.fuel_type}
					</span>
					<span className='text-secondary text-xl'>Тип двигателя: {car.model.engine_type}</span>
					<span className='text-secondary text-xl'>Разгон до сотни: </span>
					<span className='text-secondary text-xl'>Трансмиссия: {car.model.transmission}</span>
					<span className='text-secondary text-xl'>Вес: </span>
					<span className='text-secondary text-xl'>Кузов: {bodyTypeToRu[car.model.body_type]}</span>
					<span className='text-secondary text-xl'>
						Привод: {driveTypeToRu[car.model.drive_type]}
					</span>
					<span className='text-secondary text-xl'>Цвет: </span>
				</div>
			</div>
			<div className='w-full rounded-[8px] mt-5 text-2xl font-bold text-center text-accent bg-quaternaryBg py-3 px-1'>
				{formatPrice(+car.car.price)}
			</div>
		</article>
	)
}

export default CarInfo
