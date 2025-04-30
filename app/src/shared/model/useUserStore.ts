import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { IUserData } from '../../../interfaces/userInterface'

interface UserStore {
	id: number | null
	name: string
	email: string
	phoneNumber: string
	numberOfWarn: number
	created_at: string
	setUser: (userData: IUserData | null) => void
}

export const useUserStore = create<UserStore>()(
	immer(set => ({
		id: null,
		name: '',
		email: '',
		phoneNumber: '',
		numberOfWarn: 0,
		created_at: '',
		setUser: userData =>
			set(() => ({
				id: userData ? userData.id : '',
				name: userData ? userData.name : '',
				email: userData ? userData.email : '',
				phoneNumber: userData ? userData.phone_number : '',
				numberOfWarn: userData ? userData.number_of_warn : 0,
				created_at: userData ? userData.created_at : '',
			})),
	}))
)
