import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../api/getOrders'
import { UserRole } from '../../cars'
import { IOrder } from '@/app/src/shared/types/orders'
import { RequestsTabFilter } from '@/app/src/shared/types/requests'

export const useGetOrders = (
	status: RequestsTabFilter,
	role: UserRole,
	page: number,
	pageSize: number,
	userId?: number
) => {
	return useQuery<{ orders: IOrder[]; total: number }>({
		queryKey: ['orders', role, status, page],
		queryFn: () => getOrders(status, page, pageSize, userId),
		placeholderData: prev => prev,
	})
}
