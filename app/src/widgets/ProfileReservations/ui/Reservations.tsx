'use client'

import { useReservations } from '../model/useReservations'
import { useAuthStore } from '../../cars'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Paginator } from '@/app/src/shared/ui/Paginator'
import { useReservationStore } from '@/app/src/shared/model/useReservationStore'
import Reservation from '@/app/src/entities/Reservation/ui/Reservation'
import Skeleton from '@/app/src/shared/ui/Skeleton/Skeleton'
import { AnimatePresence, easeInOut } from 'framer-motion'
import { motion } from 'framer-motion'
import { useRequestsStore } from '@/app/src/shared/model/useRequestsStore'

const Reservations = () => {
	const userId = useUserStore(state => state.id)
	const role = useAuthStore(state => state.role)
	const setAuthData = useAuthStore(state => state.setAuthData)

	const reservations = useReservationStore(state => state.reservations) || []
	const setReservations = useReservationStore(state => state.setReservations)
	const setTotalCountReservations = useReservationStore(state => state.setTotalCountReservations)
	const statusRequests = useRequestsStore(state => state.statusRequests)

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
		status: statusRequests,
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
		<>
			<motion.section
				animate={{ height: reservations.length === 0 ? 300 : 1250 }}
				transition={{ duration: 0.6, ease: easeInOut }}
				className='grid grid-cols-2 gap-5 mt-5 min-h-[300px]'
			>
				{isLoading && (
					<section className='row-start-1 row-end-2 col-start-1 col-end-3'>
						<Skeleton width={1000} height={500} count={2} flow='horizontal' />
					</section>
				)}
				<AnimatePresence mode='popLayout'>
					{reservations.map(reservation => (
						<motion.article
							layout
							key={reservation.id}
							exit={{ opacity: 0, y: 30 }}
							transition={{ duration: 0.3 }}
						>
							<Reservation reservation={reservation} key={reservation.id} />
						</motion.article>
					))}
				</AnimatePresence>
			</motion.section>

			<Paginator
				page={page}
				totalCountPages={Math.ceil(totalCountReservations / pageSize)}
				portionSize={portionSize}
				changePage={setPage}
			/>
		</>
	)
}

export default Reservations
