import { axiosInstance } from '@/app/src/shared/api/axiosInstance'

type Status = 'active' | 'completed' | 'cancelled'

export const getOrders = async (status: Status, userId?: number) => {
	try {
		const queryPath = userId ? `/${userId}` : ``
		const res = await axiosInstance.get(`/api/orders${queryPath}`)
		if (res.status >= 200 && res.status < 300) return res.data

		throw new Error(`HTTP status: ${res.status}`)
	} catch (error: any) {
		if (error.response) {
			const customError = new Error(`Request failed with status ${error.response.status}`)
			customError.response = error.response
			throw customError
		}
		throw new Error('Network error or something went wrong')
	}
}
