import { useQuery } from '@tanstack/react-query'
import { authMe } from '../api/authMe.api'

export const useAuthMe = () => {
	return useQuery({
		queryKey: ['authMe'],
		queryFn: authMe,
		/* enabled: !isInitialized, */
	})
}
