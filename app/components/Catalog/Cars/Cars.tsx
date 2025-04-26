'use client'

import { useCarsStore } from '@/app/stores/useCarsStore'
import Car from './Car'
import { useCars } from '@/app/hooks/useCars'
import { useEffect } from 'react'
import { useAuthStore } from '@/app/stores/useAuthStore'
import { UserRole } from '@/app/interfaces/userInterface'
import Link from 'next/link'
import Image from 'next/image'
import addCarImg from '../../../assets/addCar.png'

const Cars = () => {
	const role = useAuthStore(state => state.role)
	const { data, isLoading, error } = useCars()
	const cars = useCarsStore(state => state.cars)
	const setCars = useCarsStore(state => state.setCars)

	useEffect(() => {
		if (data) setCars(data)
	}, [data])

	if (isLoading && !data) return <h1>Loading...</h1>
	if (error) return <h1>Произошла ошибка</h1>

	return (
		<section className='grid grid-cols-3 gap-x-14 gap-y-8 items-start self-start'>
			{role !== UserRole.USER && (
				<Link
					href='/addCar'
					className='row-start-1 row-end-2 col-start-1 col-end-4 rounded-[8px] border-2 border-accentBg text-accent text-center text-2xl py-4 font-bold'
				>
					<Image src={addCarImg} alt='' width={20} height={20} className='inline-block mr-3' />
					<span>Добавить новый автомобиль</span>
				</Link>
			)}
			{cars.map(car => {
				return <Car {...car} role={role!} key={car.car.id} />
			})}
		</section>
	)
}

export default Cars
