import { ICar } from '@/app/interfaces/carsInterface'
import { axiosInstance } from '@/app/src/shared/api/axiosInstance'

export const addCar = async (carData: FormData) => {
	try {
		const res = await axiosInstance.post<ICar>('/api/cars', carData)

		if (res.status !== 200) throw new Error(`HTTP status: ${res.status}`)
		return res.data
	} catch (error: any) {
		if (error.response) {
			const customError = new Error(`Request failed with status ${error.response.status}`)
			customError.response = error.response
			throw customError
		}
		throw new Error('Network error or something went wrong')
	}
}
