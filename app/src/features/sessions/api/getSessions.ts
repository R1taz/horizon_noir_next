import { axiosInstance } from '@/app/src/shared/api/axiosInstance'

export interface ISession {
	id: number
	user_agent: string | null
	ip: string | null
	created_at: string
	last_used_at: string | null
	expires_at: string
	is_current: boolean
}

export async function getSessions(): Promise<ISession[]> {
	const res = await axiosInstance.get('/api/users/me/sessions')
	return res.data
}
