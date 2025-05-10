import { useQuery } from '@tanstack/react-query'
import { IReservation } from '@/app/src/shared/types/reservations'
import { getReservationsForMonth } from '../api/getReservationsForMonth'
import { useCalendarStore } from '@/app/src/shared/model/useCalendarStore'

export const useReservationsForMonth = () => {
	const month = useCalendarStore(state => state.month)
	return useQuery<IReservation[]>({
		queryKey: ['reservations-for-month', month],
		queryFn: () => getReservationsForMonth(month!),
		placeholderData: prev => prev,
	})
}
