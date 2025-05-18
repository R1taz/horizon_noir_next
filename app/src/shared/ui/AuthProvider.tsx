'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '../model/useAuthStore'
import { ReactNode, useEffect } from 'react'

interface Props {
	children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
	const isAuth = useAuthStore(state => state.isAuth)

	const router = useRouter()

	useEffect(() => {
		if (!isAuth) router.replace('/login')
	}, [])

	if (!isAuth) return

	return children
}

export default AuthProvider
