import { axiosInstance } from '@/app/src/shared/api/axiosInstance'

export async function getProfile() {
	try {
		const res = await axiosInstance.get('/api/users/myProfile')
		if (res.status >= 200 && res.status < 300) throw new Error(`HTTP status: ${res.status}`)
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
