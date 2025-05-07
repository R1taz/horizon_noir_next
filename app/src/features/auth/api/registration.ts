import { axiosInstance } from '@/app/src/shared/api/axiosInstance'
import { RegistrationData } from '../model/types'
import { IUserData } from '@/app/interfaces/userInterface'

export async function registration(registrationData: Omit<RegistrationData, 'terms'>) {
	try {
		const res = await axiosInstance.post<IUserData>('/api/registration', registrationData)
		if (res.status < 200 || res.status >= 300) throw new Error(`HTTP status: ${res.status}`)
		return res.data
	} catch (error) {
		if (error.response.status === 401) {
			const customError = new Error(`Request failed with status ${error.response.status}`)
			customError.response = error.response
			throw customError
		}
		throw new Error('Network error or something went wrong')
	}
}
