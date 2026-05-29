import { axiosInstance } from '@/app/src/shared/api/axiosInstance'
import { IUserData } from '@/app/interfaces/userInterface'

export async function updateAvatar(file: File): Promise<IUserData> {
	const formData = new FormData()
	formData.append('avatar', file)
	const res = await axiosInstance.patch('/api/users/me/avatar', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
	if (res.status < 200 || res.status >= 300) throw new Error(`HTTP ${res.status}`)
	return res.data
}
