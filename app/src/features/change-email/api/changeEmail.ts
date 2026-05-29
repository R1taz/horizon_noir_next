import { axiosInstance } from '@/app/src/shared/api/axiosInstance'
import { IUserData } from '@/app/interfaces/userInterface'

interface Params {
	currentPassword: string
	newEmail: string
}

export async function changeEmail({ currentPassword, newEmail }: Params): Promise<IUserData> {
	const res = await axiosInstance.patch('/api/users/me/email', { currentPassword, newEmail })
	return res.data
}
