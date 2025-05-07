import { useQuery } from '@tanstack/react-query'
import { IModel } from '../types/models'
import { getModels } from '../api/models/getModels'

export const useModels = (brandId: number | null) => {
	return useQuery<IModel[]>({
		queryKey: ['models', brandId],
		queryFn: () => {
			if (!brandId) return []
			return getModels(brandId)
		},
		enabled: !!brandId,
		staleTime: 0,
	})
}
