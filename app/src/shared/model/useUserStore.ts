import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { IUserData } from '../../../interfaces/userInterface'

interface UserStore {
	name: string
	email: string
	phoneNumber: string
	numberOfWarn: number
	setUserData: (userData: IUserData) => void
}

export const useAuthStore = create<UserStore>()(
	immer(set => ({
		name: '',
		email: '',
		phoneNumber: '',
		numberOfWarn: 0,
		setUserData: userData =>
			set(() => ({
				name: userData.name,
				email: userData.email,
				phoneNumber: userData.phone_number,
				numberOfWarn: userData.number_of_warn,
			})),
	}))
)
