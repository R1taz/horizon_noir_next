import { IBrand } from '@/app/interfaces/carsInterface'
import { useQuery } from '@tanstack/react-query'
import { getBrands } from '../api/brands/getBrands'

export const useBrands = () => {
	return useQuery<IBrand[]>({
		queryKey: ['brands'],
		queryFn: getBrands,
		staleTime: Infinity,
	})
}
