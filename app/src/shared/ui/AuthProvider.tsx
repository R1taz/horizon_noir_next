'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '../model/useAuthStore'
import { ReactNode, useEffect } from 'react'
import { useAuthMe } from '../hooks/useAuthMe'
import { useUserStore } from '../model/useUserStore'

interface Props {
	children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
	const isInitialized = useAuthStore(state => state.isInitialized)
	const setInitialized = useAuthStore(state => state.setInitialized)

	const setAuthData = useAuthStore(state => state.setAuthData)
	const setUser = useUserStore(state => state.setUser)

	const router = useRouter()

	const { data: user, error } = useAuthMe(isInitialized)

	useEffect(() => {
		if (error && (error as any)?.response?.status === 401) {
			router.replace('/login')
			setAuthData(false, 'no role')
			return
		}

		if (user && !isInitialized) {
			setInitialized(true)
			setAuthData(true, user.role)
			setUser(user)
		}
	}, [user, error])

	return children
}

export default AuthProvider
