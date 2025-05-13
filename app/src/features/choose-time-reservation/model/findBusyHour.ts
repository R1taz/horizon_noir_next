import { RequestStatus } from '@/app/src/shared/types/requests'
import { IReservation } from '@/app/src/shared/types/reservations'

export function findBusyHour(
	reservationsForMonth: IReservation[],
	day: number,
	hour: number
): IReservation | undefined {
	const findBusyHour = reservationsForMonth.find(res => {
		return (
			new Date(res.reservation_date).getHours() === hour &&
			new Date(res.reservation_date).getDate() === day &&
			res.reservation_status === RequestStatus.IN_PROGRESS
		)
	})
	return findBusyHour
}
