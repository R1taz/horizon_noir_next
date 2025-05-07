import { updateCar } from '../api/updateCar'
import { useMutation } from '@tanstack/react-query'

export const useUpdateCar = () => {
	return useMutation({
		mutationFn: (carData: FormData) => updateCar(carData),
	})
}
