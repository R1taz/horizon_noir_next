'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '../model/useAuthStore'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
	const isAuth = useAuthStore(state => state.isAuth)
	const router = useRouter()

	if (!isAuth) {
		router.replace('/login')
		return null
	}

	return <>{children}</>
}

export default AuthProvider
