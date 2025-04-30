'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '../model/useAuthStore'
import { ReactNode, useEffect } from 'react'

interface Props {
	children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
	const isInitialized = useAuthStore(state => state.isInitialized)
	const isAuth = useAuthStore(state => state.isAuth)
	const router = useRouter()

	useEffect(() => {
		if (!isInitialized) return
		if (!isAuth) router.replace('/login')
	}, [isAuth, isInitialized, router])

	if (!isAuth && !isInitialized) return <h1 className='text-primary'>Loading...</h1>

	return <>{children}</>
}

export default AuthProvider
