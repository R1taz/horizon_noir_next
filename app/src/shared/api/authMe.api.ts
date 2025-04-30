import { axiosInstance } from './axiosInstance'

export async function authMe() {
	const res = await axiosInstance.get('/api/authMe')
	return res.status >= 200 && res.status < 300
}
