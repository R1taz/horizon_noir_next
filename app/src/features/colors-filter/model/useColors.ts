import { useQuery } from '@tanstack/react-query'
import { getColors } from '../api/getColors'

export const useColors = () => {
	return useQuery({
		queryKey: ['colors'],
		queryFn: getColors,
		staleTime: Infinity,
	})
}
