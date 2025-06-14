import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { UserRole } from '@/app/interfaces/userInterface'

interface AuthStore {
	isInitialized: boolean
	isAuth: boolean
	role: UserRole | null
	setInitialized: (isInit: boolean) => void
	setAuthData: (isAuth: boolean | null, role: UserRole | null) => void
}

export const useAuthStore = create<AuthStore>()(
	immer(set => ({
		isInitialized: false,
		isAuth: false,
		role: null,
		setInitialized: isInit =>
			set(state => {
				state.isInitialized = isInit
			}),
		setAuthData: (isAuth, role) =>
			set(state => {
				state.isAuth = isAuth !== null ? isAuth : state.isAuth
				state.role = role ? role : null
			}),
	}))
)
