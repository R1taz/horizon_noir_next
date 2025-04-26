import { useMutation, useQuery } from '@tanstack/react-query'
import { getCars, getCar, removeCar } from '../api/cars'
import { ICar } from '../interfaces/carsInterface'

export const useCars = () => {
	return useQuery<ICar[]>({
		queryKey: ['cars'],
		queryFn: getCars,
	})
}

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
