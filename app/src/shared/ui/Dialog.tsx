'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	className?: string
}

const Dialog = ({ isOpen, onClose, children, className = '' }: Props) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])

	useEffect(() => {
		const onEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		if (isOpen) {
			window.addEventListener('keydown', onEsc)
			document.body.style.overflow = 'hidden'
		}
		return () => {
			window.removeEventListener('keydown', onEsc)
			document.body.style.overflow = ''
		}
	}, [isOpen, onClose])

	if (!mounted) return null

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					onClick={onClose}
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.92, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.92, y: 20 }}
						transition={{ duration: 0.25 }}
						onClick={e => e.stopPropagation()}
						className={`bg-800 rounded-[12px] p-8 max-w-md w-full shadow-2xl ${className}`}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	)
}

export default Dialog
