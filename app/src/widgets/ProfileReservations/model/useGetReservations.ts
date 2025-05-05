import { RequestsTabFilter } from '@/app/src/shared/types/requests'

import { useQuery } from '@tanstack/react-query'
import { UserRole } from '../../cars'
import { IReservation } from '@/app/src/shared/types/reservations'
import { getReservations } from '../api/getReservations'

interface Params {
	status: RequestsTabFilter
	role: UserRole
	page: number
	pageSize: number
	userId?: number
}

export const useGetReservations = ({ status, role, page, pageSize, userId }: Params) => {
	return useQuery<{ reservations: IReservation[]; total: number }>({
		queryKey: ['reservations', role, status, page],
		queryFn: () => getReservations(status, page, pageSize, userId),
	})
}
