import { useQuery } from '@tanstack/react-query'
import { IModel } from '../types/models'
import { getModels } from '../api/models/getModels'

export const useModels = (carId: number | null) => {
	return useQuery<IModel[]>({
		queryKey: ['models'],
		queryFn: () => {
			if (!carId) return []
			return getModels(carId)
		},
		enabled: !!carId,
	})
}
