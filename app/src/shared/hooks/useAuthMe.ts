import { useQuery } from '@tanstack/react-query'
import { authMe } from '../api/authMe.api'

export const useAuthMe = (isInitialized: boolean) => {
	return useQuery({
		queryKey: ['authMe', isInitialized],
		queryFn: authMe,
		enabled: !isInitialized,
	})
}
