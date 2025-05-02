import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { IUserData } from '../../../interfaces/userInterface'

interface UserStore {
	id: number | null
	name: string
	email: string
	phoneNumber: string
	numberOfWarn: number
	created_at: string | null
	increaseNumberOfWarn: () => void
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
		created_at: null,
		setUserId: id =>
			set(state => {
				state.id = id
			}),
		increaseNumberOfWarn: () =>
			set(state => {
				state.numberOfWarn = state.numberOfWarn + 1
			}),
		setUser: userData =>
			set(state => {
				state.id = userData ? userData.id : null
				state.name = userData ? userData.name : ''
				state.email = userData ? userData.email : ''
				state.phoneNumber = userData ? userData.phone_number : ''
				state.numberOfWarn = userData ? userData.number_of_warn : 0
				state.created_at = userData ? userData.created_at : null
			}),
	}))
)
