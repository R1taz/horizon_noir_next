import { getProfile } from '../api/getProfile'
import { useQuery } from '@tanstack/react-query'

export const useGetProfile = (userId: number | null) => {
	return useQuery({
		queryKey: ['getProfile'],
		queryFn: getProfile,
		enabled: userId === null,
	})
}
