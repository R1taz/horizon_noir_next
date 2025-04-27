import { addCar } from './addCar'
import { ICarData } from './types'
import { useMutation } from '@tanstack/react-query'

export const useAddCar = () => {
	return useMutation({
		mutationFn: (carData: FormData) => addCar(carData),
	})
}
