import { getCars } from '@/app/api/cars'
import { ICar } from '@/app/interfaces/carsInterface'
import { IFilters } from '@/app/src/shared/types/filters'
import { useInfiniteQuery } from '@tanstack/react-query'

interface Params {
	pageSize: number
	filters: IFilters
}

export const useCarsQuery = ({ pageSize, filters }: Params) => {
	return useInfiniteQuery<ICar[], Error>({
		queryKey: ['cars', filters],
		initialPageParam: 1,
		queryFn: ({ pageParam = 1 }) => getCars(pageParam as number, pageSize, filters),
		getNextPageParam: (lastPage, allPages) => {
			const hasMore = lastPage.length === pageSize
			return hasMore ? allPages.length + 1 : undefined
		},
	})
}
