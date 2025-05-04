'use client'

import { useEffect } from 'react'
import { Car, useCarsStore, useAuthStore, useCars, UserRole } from './index'
import AddCarTrigger from '../../features/add-car/ui/AddCarTrigger'

const Cars = () => {
	const role = useAuthStore(state => state.role)
	const { data, isLoading, error } = useCars()

	const cars = useCarsStore(state => state.cars)
	const setCars = useCarsStore(state => state.setCars)

	useEffect(() => {
		if (data) setCars(data)
	}, [data])

	if (isLoading) return <h1>Loading cars...</h1>
	if (error) return <h1>Произошла ошибка</h1>

	return (
		<section className='grid grid-cols-3 gap-x-14 gap-y-8 items-start self-start'>
			{role !== UserRole.USER && <AddCarTrigger />}

			{cars.map(car => {
				return <Car car={car.car} photos={car.photos} role={role!} key={car.car.id} />
			})}
		</section>
	)
}

export default Cars
