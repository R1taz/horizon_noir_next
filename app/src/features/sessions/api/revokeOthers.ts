import { axiosInstance } from '@/app/src/shared/api/axiosInstance'

export async function revokeOtherSessions(): Promise<{ count: number }> {
	const res = await axiosInstance.delete('/api/users/me/sessions/others')
	return res.data
}
