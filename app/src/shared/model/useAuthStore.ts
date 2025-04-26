import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { UserRole } from '@/app/interfaces/userInterface'

interface AuthStore {
	isAuth: boolean
	role: UserRole | null
	setIsAuth: (isAuth: boolean) => void
	setRole: (role: UserRole) => void
}

export const useAuthStore = create<AuthStore>()(
	immer(set => ({
		isAuth: false,
		role: UserRole.MANAGER,
		setIsAuth: isAuth => set(state => ({ ...state, isAuth })),
		setRole: role => set(state => ({ ...state, role })),
	}))
)
