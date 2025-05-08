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

	const { data: user, isLoading, error } = useAuthMe(isInitialized)

	useEffect(() => {
		console.log('authPro', error)
		if (error && error.response?.status === 401) {
			setAuthData(false, 'no role')
			router.replace('/login')
			return
		}

		if (user && !isInitialized) {
			console.log('useEffectAuthProvider', 'user')
			setInitialized(true)
			setAuthData(true, user.role)
			setUser(user)
		}
	}, [user, error])

	if (isLoading) return <h1 className='text-primary'>Loading...</h1>

	return <>{children}</>
}

export default AuthProvider
