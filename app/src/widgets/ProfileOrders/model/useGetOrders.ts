import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../api/getOrders'
import { UserRole } from '../../cars'

export const useGetOrders = (status: any, role: UserRole, userId?: number) => {
	return useQuery({
		queryKey: ['orders', role],
		queryFn: () => getOrders(status, userId),
		enabled: role !== 'user' || !!userId,
	})
}
