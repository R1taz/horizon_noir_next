'use client'

import { useEffect, useRef } from 'react'
import { Car, useCarsStore, useAuthStore, UserRole } from './index'
import AddCarTrigger from '../../features/add-car/ui/AddCarTrigger'
import { useCarsQuery } from './model/useCarsQuery'
import { useCarFiltersStore } from '../../shared/model/useCarFiltersStore'
import Loader from '@/app/assets/loader.svg'
import Skeleton from '../../shared/ui/Skeleton/Skeleton'

const Cars = () => {
	const role = useAuthStore(state => state.role)

	const setCars = useCarsStore(state => state.setCars)
	const pageSize = useCarsStore(state => state.pageSize)

	const filters = useCarFiltersStore(state => state.filters)
	const observerRef = useRef<HTMLDivElement | null>(null)

	const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading, error } = useCarsQuery({
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
			{isLoading && <Skeleton width={1050} height={70} />}
			{!isLoading && role !== UserRole.USER && <AddCarTrigger />}

			{isLoading && (
				<Loader className='row-start-3 row-end-4 col-start-2 col-end-3  w-[250px] h-[250px] left-[50px]' />
			)}
			{!isLoading &&
				allCars.map(car => {
					return <Car car={car.car} photos={car.photos} role={role!} key={car.car.id} />
				})}

			{isFetchingNextPage && <p>Загружаем ещё...</p>}
			<div ref={observerRef} />
		</section>
	)
}

export default Cars
