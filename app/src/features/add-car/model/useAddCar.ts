import { addCar } from '../api/addCar'
import { useMutation } from '@tanstack/react-query'

export const useAddCar = () => {
	return useMutation({
		mutationFn: (carData: FormData) => addCar(carData),
	})
}
