'use client'

import { AnimatePresence } from 'framer-motion'
import Notification from './Notification'
import { useNotificationStore } from '../model/useNotificationStore'

const AnimateNotification = () => {
	const isOpenNotification = useNotificationStore(state => state.isOpenNotification)
	const messageNotification = useNotificationStore(state => state.messageNotification)

	return (
		<AnimatePresence mode='wait'>
			{isOpenNotification && <Notification text={messageNotification} />}
		</AnimatePresence>
	)
}

export default AnimateNotification
