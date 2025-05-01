import { axiosInstance } from './axiosInstance'

export async function authMe() {
	try {
		const res = await axiosInstance.get('/api/authMe')
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
