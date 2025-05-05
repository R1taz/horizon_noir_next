import { axiosInstance } from '@/app/src/shared/api/axiosInstance'
import { RequestsTabFilter } from '@/app/src/shared/types/requests'

export async function getReservations(
	status: RequestsTabFilter,
	page: number,
	pageSize: number,
	userId?: number
) {
	try {
		const dynamicPath = userId ? `/${userId}` : ''
		const queryPath = status ? `status=${status}` : 'status=active'

		const res = await axiosInstance.get(
			`/api/reservations${dynamicPath}?${queryPath}&page=${page}&limit=${pageSize}`
		)
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
