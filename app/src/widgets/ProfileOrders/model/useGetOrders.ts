import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../api/getOrders'
import { UserRole } from '../../cars'
import { IOrder, OrdersStatus } from '@/app/src/shared/types/orders'

export const useGetOrders = (
	status: OrdersStatus,
	role: UserRole,
	page: number,
	pageSize: number,
	userId?: number
) => {
	return useQuery<[orders: IOrder[], total: number]>({
		queryKey: ['orders', role, status, page],
		queryFn: () => getOrders(status, page, pageSize, userId),
	})
}
