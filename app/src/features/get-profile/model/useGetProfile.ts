import { getProfile } from '../api/getProfile'
import { useQuery } from '@tanstack/react-query'

export const useGetProfile = (created_at: string | null) => {
	return useQuery({
		queryKey: ['getProfile'],
		queryFn: getProfile,
		enabled: !created_at ? true : false,
	})
}
