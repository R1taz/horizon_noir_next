import { IReservation } from '@/app/src/shared/types/reservations'
import { StatusBusy } from './types'

export function findBusyDay(reservations: IReservation[], day: number): StatusBusy {
	const findBusyDays = reservations.filter(res => new Date(res.reservation_date).getDate() === day)

	if (findBusyDays.length === 0) {
		return 'empty'
	} else if (findBusyDays.length > 0 && findBusyDay.length < 16) {
		return 'half'
	} else {
		return 'full'
	}
}
