export interface IUserData {
	id: number
	name: string
	email: string
	phone_number: string
	number_of_warn: number
	created_at: string
	photo_url?: string | null
}

export enum UserRole {
	USER = 'user',
	MANAGER = 'manager',
	ADMIN = 'admin',
}
