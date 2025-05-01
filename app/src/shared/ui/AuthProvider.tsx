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

	const isAuth = useAuthStore(state => state.isAuth)
	const setAuthData = useAuthStore(state => state.setAuthData)
	const setUserId = useUserStore(state => state.setUserId)

	const router = useRouter()

	const { data, isLoading, error } = useAuthMe(isInitialized)

	useEffect(() => {
		if (error && error.response?.status === 401) {
			setAuthData(false, 'no role')
			router.replace('/login')
			return
		}

		if (data && !isInitialized) {
			console.log('initialized has been worked')
			setInitialized(true)
			setAuthData(true, data.role)
			setUserId(data.userId)
		}
	}, [data, error])

	if ((!isAuth && !isInitialized) || isLoading) return <h1 className='text-primary'>Loading...</h1>

	return <>{children}</>
}

export default AuthProvider
