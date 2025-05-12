import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface NotificationStore {
	isOpenNotification: boolean
	messageNotification: string
	setIsOpenNotification: (open: boolean) => void
	setMessageNotification: (message: string) => void
}

export const useNotificationStore = create<NotificationStore>()(
	immer(set => ({
		isOpenNotification: false,
		messageNotification: '',
		setIsOpenNotification: (open: boolean) =>
			set(state => {
				state.isOpenNotification = open
			}),
		setMessageNotification: (message: string) =>
			set(state => {
				state.messageNotification = message
			}),
	}))
)
