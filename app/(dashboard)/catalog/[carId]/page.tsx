'use client'

import { getCar } from '@/app/api/cars'
import CarInfo from '@/app/components/Car/CarInfo'
import CarPhotos from '@/app/components/Car/CarPhotos/CarPhotos'
import FormOrderCar from '@/app/src/widgets/FormOrderCar/ui/FormOrderCar'
import FormReservationCar from '@/app/components/Car/FormReservationCar/FormReservationCar'
import BreadCrumbs from '@/app/src/shared/ui/BreadCrumbs'
import Footer from '@/app/src/shared/ui/Footer'
import { ICar } from '@/app/interfaces/carsInterface'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import AuthProvider from '@/app/src/shared/ui/AuthProvider'

const page = () => {
	const { carId } = useParams()
	const {
		data: car,
		isLoading,
		error,
	} = useQuery<ICar>({
		queryKey: ['car'],
		queryFn: () => getCar(+carId),
	})

	if (!car || isLoading) return <h1>Loading...</h1>
	if (error) return <h1>Error</h1>

	return (
		<AuthProvider>
			<BreadCrumbs />
			<CarInfo car={car} />
			<CarPhotos photos={car.photos} />
			<FormReservationCar />
			<FormOrderCar />
			<Footer />
		</AuthProvider>
	)
}

export default page
