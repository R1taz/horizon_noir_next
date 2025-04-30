import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { UserRole } from '@/app/interfaces/userInterface'

interface AuthStore {
	isAuth: boolean
	isInitialized: boolean
	role: UserRole | null
	setInitialized: (initialized: boolean) => void
	setIsAuth: (isAuth: boolean) => void
	setRole: (role: UserRole | null) => void
}

export const useAuthStore = create<AuthStore>()(
	persist(
		immer(set => ({
			isAuth: false,
			isInitialized: false,
			role: null,
			setInitialized: initialized =>
				set(state => {
					state.isInitialized = initialized
				}),
			setIsAuth: isAuth => set(state => ({ ...state, isAuth })),
			setRole: role => set(state => ({ ...state, role })),
		})),
		{
			name: 'AuthStore',
			version: 1,
			onRehydrateStorage: () => state => {
				state?.setInitialized(true)
			},
		}
	)
)
