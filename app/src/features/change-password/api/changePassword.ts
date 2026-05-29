import { axiosInstance } from '@/app/src/shared/api/axiosInstance'

interface Params {
	currentPassword: string
	newPassword: string
}

export async function changePassword({ currentPassword, newPassword }: Params) {
	const res = await axiosInstance.patch('/api/users/me/password', { currentPassword, newPassword })
	return res.data
}
