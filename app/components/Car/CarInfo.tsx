import { CarStatus, ICar } from '@/app/interfaces/carsInterface'
import { bodyTypeToRu } from '@/app/src/shared/lib/format/bodyTypeToRu'
import { driveTypeToRu } from '@/app/src/shared/lib/format/driveTypeToRu'
import { formatPrice } from '@/app/src/shared/lib/format/formatPrice'
import { easeOut, motion } from 'framer-motion'
import CarCharacteristic from './CarCharacteristic'
import { formateDate } from '@/app/src/shared/lib/format/formatDate'

const titleVariants = {
	initial: { opacity: 0, y: -30 },
	animate: { opacity: 1, y: 0 },
}

const mainImageVariants = {
	initial: { opacity: 0, x: -30 },
	animate: { opacity: 1, x: 0 },
}

const priceVariants = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
}

interface Props {
	car: ICar
}

const textVariants = {
	initial: { opacity: 0, x: 10, transition: { duration: 0.5, ease: easeOut } },
	animate: { opacity: 1, x: 0 },
}

const CarInfo = ({ car }: Props) => {
	const mainPhoto = car.photos.find(photo => photo.main_photo === true)

	if (!mainPhoto) return <h1>Отсутствует главная фотография</h1>

	return (
		<article>
			<div className='flex gap-8 h-[425px]'>
				{!mainPhoto && <h1 className='flex-1'>Отсутствует фотография</h1>}
				{mainPhoto && (
					<motion.img
						variants={mainImageVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut }}
						className=' rounded-[8px] object-cover w-[50%] h-full z-10'
						src={process.env.NEXT_PUBLIC_BASE_BACKEND_URL + '/' + mainPhoto.url.replace(/\\/g, '/')}
						alt='Главное фото автомобиля'
					/>
				)}
				<article className='flex flex-col gap-4'>
					<motion.h1
						variants={titleVariants}
						initial='initial'
						animate='animate'
						className='text-300 text-2xl'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
					>
						{car.car.brand} {car.car.model}
					</motion.h1>
					<motion.section
						variants={textVariants}
						initial='initial'
						animate='animate'
						transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
						className='flex flex-col gap-4'
					>
						<CarCharacteristic title='Год выпуска:' text={String(car.car.manufacturer_date)} />
						<CarCharacteristic
							title='Двигатель:'
							text={`${car.model.engine_volume} л. / ${car.model.power} л.с. / ${car.model.fuel_type}`}
						/>
						<CarCharacteristic title='Тип двигателя:' text={String(car.model.engine_type)} />
						<CarCharacteristic title='Разгон до сотни:' text='' />
						<CarCharacteristic title='Трансмиссия:' text={String(car.model.transmission)} />
						<CarCharacteristic title='Вес:' text='' />
						<CarCharacteristic title='Кузов:' text={String(bodyTypeToRu[car.model.body_type])} />
						<CarCharacteristic title='Привод:' text={String(driveTypeToRu[car.model.drive_type])} />
						<CarCharacteristic title='Цвет:' text='' />
					</motion.section>
				</article>
			</div>
			<motion.article
				variants={priceVariants}
				initial='initial'
				animate='animate'
				transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
				className='w-full rounded-[8px] mt-5 text-2xl font-bold text-center text-accent bg-800 py-3 px-1 shadow-lg'
			>
				{formatPrice(+car.car.price)}
			</motion.article>

			<motion.section className='flex gap-10 items-center justify-evenly my-20'>
				<article className='bg-600 rounded-[8px] px-20 py-6 backdrop-blur-lg bg-white/10 shadow-lg'>
					<motion.h1 className='text-300 text-center text-4xl font-bold mb-9'>
						Адрес автосалона
					</motion.h1>
					<p className='text-center text-400 text-2xl'>123</p>
				</article>

				<article className='bg-600 rounded-[8px] px-20 py-6 backdrop-blur-lg bg-white/10 shadow-lg'>
					<motion.h1 className='text-300 text-center text-4xl font-bold mb-9'>
						Статус доставки автомобиля
					</motion.h1>
					<p className='text-center text-400 text-2xl'>
						{car.car.status === CarStatus.STOCK
							? 'Доступен к покупке'
							: `Будет в салоне ${formateDate(car.car.date_delivery!)}`}
					</p>
				</article>
			</motion.section>
		</article>
	)
}

export default CarInfo
