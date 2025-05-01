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
	setUserId: (id: number) => void
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
		setUserId: id =>
			set(state => {
				state.id = id
			}),
		setUser: userData =>
			set(() => ({
				id: userData ? userData.id : null,
				name: userData ? userData.name : '',
				email: userData ? userData.email : '',
				phoneNumber: userData ? userData.phone_number : '',
				numberOfWarn: userData ? userData.number_of_warn : 0,
				created_at: userData ? userData.created_at : '',
			})),
	}))
)
