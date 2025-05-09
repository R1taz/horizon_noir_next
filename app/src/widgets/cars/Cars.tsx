'use client'

import { useEffect, useRef } from 'react'
import { Car, useCarsStore, useAuthStore, UserRole } from './index'
import AddCarTrigger from '../../features/add-car/ui/AddCarTrigger'
import { useCarsQuery } from './model/useCarsQuery'
import { useCarFiltersStore } from '../../shared/model/useCarFiltersStore'

const Cars = () => {
	const role = useAuthStore(state => state.role)

	const setCars = useCarsStore(state => state.setCars)
	const pageSize = useCarsStore(state => state.pageSize)

	const filters = useCarFiltersStore(state => state.filters)
	const observerRef = useRef<HTMLDivElement | null>(null)

	const { data, isFetchingNextPage, hasNextPage, fetchNextPage, error } = useCarsQuery({
		pageSize,
		filters,
	})

	const allCars = data?.pages.flat() || []

	useEffect(() => {
		const observer = new IntersectionObserver(
			entities => {
				if (entities[0].isIntersecting && hasNextPage) {
					fetchNextPage()
				}
			},
			{ threshold: 1.0 }
		)

		if (observerRef.current) observer.observe(observerRef.current)

		return () => {
			if (observerRef.current) observer.unobserve(observerRef.current)
		}
	}, [observerRef, hasNextPage])

	useEffect(() => {
		if (data) {
			setCars(allCars)
		}
	}, [data])

	if (error) return <h1>Произошла ошибка</h1>

	return (
		<section className='grid grid-cols-3 gap-x-14 gap-y-10 items-start self-start'>
			{role !== UserRole.USER && <AddCarTrigger />}

			{allCars.map(car => {
				return <Car car={car.car} photos={car.photos} role={role!} key={car.car.id} />
			})}

			{isFetchingNextPage && <p>Загружаем ещё...</p>}
			<div ref={observerRef} />
		</section>
	)
}

export default Cars
