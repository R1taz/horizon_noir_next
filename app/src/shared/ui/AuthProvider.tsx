'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '../model/useAuthStore'
import { ReactNode, useEffect } from 'react'
import { useAuthMe } from '../hooks/useAuthMe'

interface Props {
	children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
	const isInitialized = useAuthStore(state => state.isInitialized)
	const setInitialized = useAuthStore(state => state.setInitialized)

	const isAuth = useAuthStore(state => state.isAuth)
	const setIsAuth = useAuthStore(state => state.setIsAuth)

	const router = useRouter()

	const { data } = useAuthMe(isInitialized)

	useEffect(() => {
		if (data === undefined) return
		setInitialized(true)
		if (data === false) router.replace('/login')
		else setIsAuth(true)
	}, [isAuth, data, router])

	if (!isAuth && !isInitialized) return <h1 className='text-primary'>Loading...</h1>

	return <>{children}</>
}

export default AuthProvider
