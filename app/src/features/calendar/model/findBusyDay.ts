import { IReservation } from '@/app/src/shared/types/reservations'
import { StatusBusy } from './types'
import { RequestStatus } from '@/app/src/shared/types/requests'

export function findBusyDay(reservations: IReservation[], day: number): StatusBusy {
	const findDays = reservations.filter(
		res =>
			new Date(res.reservation_date).getDate() === day &&
			res.reservation_status === RequestStatus.IN_PROGRESS
	)

	if (findDays.length === 0) {
		return 'empty'
	} else if (findDays.length > 0 && findDays.length < 11) {
		return 'half'
	} else {
		return 'full'
	}
}
