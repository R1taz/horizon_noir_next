'use client'

import { ICar } from '@/app/interfaces/carsInterface'
import CarInfo from '@/app/components/Car/CarInfo'
import CarPhotos from '@/app/components/Car/CarPhotos/CarPhotos'
import FormOrderCar from '@/app/src/widgets/FormOrderCar/ui/FormOrderCar'
import FormReservationCar from '@/app/src/widgets/FormReservationCar/ui/FormReservationCar'
import BreadCrumbs from '@/app/src/shared/ui/BreadCrumbs'

interface Props {
	car: ICar
}

const CarDetailClient = ({ car }: Props) => {
	return (
		<>
			<BreadCrumbs current={`${car.car.brand} ${car.car.model}`} />
			<CarInfo car={car} />
			<CarPhotos photos={car.photos} />
			<FormReservationCar dateDelivery={car.car.date_delivery} />
			<FormOrderCar />
		</>
	)
}

export default CarDetailClient
