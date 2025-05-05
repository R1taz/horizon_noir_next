import { create } from 'zustand'
import { IReservation } from '../types/reservations'
import { immer } from 'zustand/middleware/immer'
import { RequestsTabFilter } from '../types/requests'

interface ReservationStore {
	statusReservations: RequestsTabFilter
	reservations: IReservation[]
	page: number
	pageSize: number
	portionSize: number
	totalCountReservations: number
	setReservations: (reservations: IReservation[]) => void
	updateReservation: (reservation: IReservation) => void
	setStatusReservations: (status: RequestsTabFilter) => void
	setTotalCountReservations: (totalCount: number) => void
	setPage: (page: number) => void
}

export const useReservationStore = create<ReservationStore>()(
	immer(set => ({
		reservations: [],
		statusReservations: 'active',
		page: 1,
		pageSize: 4,
		portionSize: 5,
		totalCountReservations: 0,
		setReservations: reservations =>
			set(state => {
				state.reservations = reservations
			}),
		updateReservation: updateReservation =>
			set(state => {
				state.reservations = state.reservations.map(reservation => {
					return reservation.id === updateReservation.id
						? { ...updateReservation, main_photo_url: reservation.main_photo_url }
						: reservation
				})
			}),
		setTotalCountReservations: totalCount =>
			set(state => {
				state.totalCountReservations = totalCount
			}),
		setStatusReservations: status =>
			set(state => {
				state.statusReservations = status
			}),
		setPage: page =>
			set(state => {
				state.page = page
			}),
	}))
)
