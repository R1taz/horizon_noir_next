import { useQuery } from '@tanstack/react-query'
import { getColorsByModelId } from '../api/getColorsByModelId'

export const useColorsByModel = (modelId: number) => {
	return useQuery({
		queryKey: ['colorsByModelId', modelId],
		queryFn: () => getColorsByModelId(modelId),
	})
}
