import { useMutation, useQuery } from '@tanstack/react-query'
import { getCar, removeCar } from '../api/cars'
import { ICar } from '../interfaces/carsInterface'

export const useCar = (carId: number) => {
	return useQuery<ICar>({
		queryKey: ['car'],
		queryFn: () => getCar(carId),
	})
}

export const useRemoveCar = () => {
	return useMutation({
		mutationFn: (carId: number) => removeCar(carId),
	})
}
