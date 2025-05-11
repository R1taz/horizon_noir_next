'use client'

import AnimateLayout from '@/app/src/shared/ui/AnimateLayout/AnimateLayout'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true)

	const pathname = usePathname()

	useEffect(() => {
		setTimeout(() => setIsLoading(false), 3000)
	}, [])

	return (
		<>
			<AnimatePresence mode='wait' initial={false}>
				{isLoading && <AnimateLayout key={pathname} />}
			</AnimatePresence>
			{!isLoading && children}
		</>
	)
}

export default layout
