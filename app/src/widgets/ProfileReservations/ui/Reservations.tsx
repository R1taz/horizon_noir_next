'use client'

import StatusesOrders from '../../ProfileOrders/ui/StatusesOrders'
import TypeOrders from '../../ProfileOrders/ui/TypeOrders'
import { useReservations } from '../model/useReservations'
import { useAuthStore } from '../../cars'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Paginator } from '@/app/src/shared/ui/Paginator'
import { useReservationStore } from '@/app/src/shared/model/useReservationStore'
import Reservation from '@/app/src/entities/Reservation/ui/Reservation'
import Skeleton from '@/app/src/shared/ui/Skeleton/Skeleton'

const Reservations = () => {
	const userId = useUserStore(state => state.id)
	const role = useAuthStore(state => state.role)
	const setAuthData = useAuthStore(state => state.setAuthData)

	const reservations = useReservationStore(state => state.reservations) || []
	const setReservations = useReservationStore(state => state.setReservations)
	const statusReservations = useReservationStore(state => state.statusReservations)
	const setStatusReservations = useReservationStore(state => state.setStatusReservations)
	const setTotalCountReservations = useReservationStore(state => state.setTotalCountReservations)

	const page = useReservationStore(state => state.page)
	const pageSize = useReservationStore(state => state.pageSize)
	const portionSize = useReservationStore(state => state.portionSize)
	const totalCountReservations = useReservationStore(state => state.totalCountReservations)
	const setPage = useReservationStore(state => state.setPage)

	const router = useRouter()

	const {
		data: dataReservations,
		isLoading,
		error,
	} = useReservations({
		status: statusReservations,
		role: role!,
		page,
		pageSize,
		userId: role === 'user' ? userId! : undefined,
	})

	useEffect(() => {
		if (error) {
			if ((error as any)?.response?.status === 401) {
				setAuthData(false, 'no role')
				router.replace('/login')
			}
		}

		if (dataReservations) {
			setReservations([...dataReservations.reservations].reverse())
			setTotalCountReservations(dataReservations.total)
		}
	}, [dataReservations, error])

	return (
		<article className='bg-800 rounded-[8px] mb-5 px-7 py-3 col-start-2 col-end-4 row-start-2 row-end-5'>
			<header className='py-1 relative'>
				<h2 className='text-2xl font-bold text-400'>Мои заявки</h2>
			</header>

			<div className='my-2 relative'>
				<div className='w-full h-[2px] bg-600'></div>
			</div>

			<section className='flex justify-between mt-5'>
				<TypeOrders />
				<StatusesOrders statusOrders={statusReservations} setStatusOrders={setStatusReservations} />
			</section>

			<section className='grid grid-cols-2 gap-8 mt-5'>
				{/* {isLoading && <Loader className='width-[250px] height-[250px]' />} */}
				{isLoading && (
					<section className='row-start-1 row-end-2 col-start-1 col-end-3'>
						<Skeleton width={1000} height={500} count={2} flow='horizontal' />
					</section>
				)}
				{!isLoading &&
					reservations.map(reservation => (
						<Reservation reservation={reservation} key={reservation.id} />
					))}
			</section>

			<Paginator
				page={page}
				totalCountPages={Math.ceil(totalCountReservations / pageSize)}
				portionSize={portionSize}
				changePage={setPage}
			/>
		</article>
	)
}

export default Reservations
