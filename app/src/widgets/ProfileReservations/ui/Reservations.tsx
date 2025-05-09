'use client'

import StatusesOrders from '../../ProfileOrders/ui/StatusesOrders'
import TypeOrders from '../../ProfileOrders/ui/TypeOrders'
import { useGetReservations } from '../model/useGetReservations'
import { useAuthStore } from '../../cars'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Paginator } from '@/app/src/shared/ui/Paginator'
import { useReservationStore } from '@/app/src/shared/model/useReservationStore'
import Reservation from '@/app/src/entities/Reservation/ui/Reservation'

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

	const { data: dataReservations, error } = useGetReservations({
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
		<article className='bg-quaternaryBg rounded-[8px] mb-5 px-7 py-3 col-start-2 col-end-4 row-start-2 row-end-5'>
			<header className='py-1 relative'>
				<h2 className='text-2xl font-bold text-primary'>Мои заявки</h2>
			</header>

			<div className='my-2 relative'>
				<div className='w-full h-[2px] bg-tertiaryBg'></div>
			</div>

			<section className='flex justify-between mt-5'>
				<TypeOrders />
				<StatusesOrders statusOrders={statusReservations} setStatusOrders={setStatusReservations} />
			</section>

			<section className='grid grid-cols-2 gap-8 mt-5'>
				{reservations.map(reservation => (
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
