import { useEffect } from 'react'
import { useNotificationStore } from '../model/useNotificationStore'

interface Response {
	setIsOpenNotification: (open: boolean) => void
	setMessageNotification: (message: string) => void
}

export function useNotification(): Response {
	const isOpen = useNotificationStore(state => state.isOpenNotification)
	const setIsOpenNotification = useNotificationStore(state => state.setIsOpenNotification)
	const setMessageNotification = useNotificationStore(state => state.setMessageNotification)

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				setIsOpenNotification(false)
				setMessageNotification('')
			}, 2000)
		}
	}, [isOpen])

	return { setIsOpenNotification, setMessageNotification }
}
