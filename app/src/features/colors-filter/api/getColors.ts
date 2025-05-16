import { IColor } from '@/app/interfaces/carsInterface'
import { axiosInstance } from '@/app/src/shared/api/axiosInstance'

export async function getColors() {
	try {
		const res = await axiosInstance.get<IColor[]>('/api/colors')
		if (res.status >= 200 && res.status < 300) return res.data
		throw new Error(`HTTP status: ${res.status}`)
	} catch (error: any) {
		if (error.response) {
			const customError = new Error(`Request failed with status ${error.response.status}`)
			customError.response = error.response
			throw customError
		}
	}
}
