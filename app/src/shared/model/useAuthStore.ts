import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { UserRole } from '@/app/interfaces/userInterface'

interface AuthStore {
	isAuth: boolean
	isInitialized: boolean
	role: UserRole | null
	setInitialized: (initialized: boolean) => void
	setAuthData: (isAuth: boolean | null, role: UserRole | null) => void
}

export const useAuthStore = create<AuthStore>()(
	immer(set => ({
		isAuth: false,
		isInitialized: false,
		role: null,
		setInitialized: initialized =>
			set(state => {
				state.isInitialized = initialized
			}),
		setAuthData: (isAuth, role) =>
			set(state => {
				state.isAuth = isAuth !== null ? isAuth : state.isAuth
				state.role = role ? role : null
			}),
	}))
)
