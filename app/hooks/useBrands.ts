import { useQuery } from '@tanstack/react-query'
import { getBrands } from '../api/brand'
import { IBrand } from '../interfaces/carsInterface'

export const useBrands = () => {
	return useQuery<IBrand[]>({
		queryKey: ['brands'],
		queryFn: getBrands,
		staleTime: Infinity,
	})
}
