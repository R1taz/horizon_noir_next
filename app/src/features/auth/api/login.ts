import { LoginData } from '@/app/interfaces/authInterface'
import { axiosInstance } from '@/app/src/shared/api/axiosInstance'

export async function login({ email, password }: LoginData) {
	try {
		const res = await axiosInstance.post('/api/login', { email, password })
		if (res.status !== 200) throw new Error('Failed to fetch')
		return res.data
	} catch (error) {
		console.log('Произошла ошибка: ' + error)
		throw new Error('Произошла ошибка при авторизации')
	}
}
