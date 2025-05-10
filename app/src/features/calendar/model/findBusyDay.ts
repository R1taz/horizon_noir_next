import { IReservation } from '@/app/src/shared/types/reservations'
import { StatusBusy } from './types'

export function findBusyDay(reservations: IReservation[], day: number): StatusBusy {
	const findDays = reservations.filter(res => new Date(res.reservation_date).getDate() === day)

	if (findDays.length === 0) {
		return 'empty'
	} else if (findDays.length > 0 && findDays.length < 11) {
		return 'half'
	} else {
		return 'full'
	}
}
