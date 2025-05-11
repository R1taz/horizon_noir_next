import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Response {
	isOpenNotification: boolean
	setIsOpenNotification: Dispatch<SetStateAction<boolean>>
	messageNotification: string
	setMessageNotification: Dispatch<SetStateAction<string>>
}

export function useNotification(): Response {
	const [isOpenNotification, setIsOpenNotification] = useState(false)
	const [messageNotification, setMessageNotification] = useState('')

	useEffect(() => {
		if (isOpenNotification) {
			setTimeout(() => {
				setIsOpenNotification(false)
				setMessageNotification('')
			}, 1700)
		}
	}, [isOpenNotification])

	return { isOpenNotification, setIsOpenNotification, messageNotification, setMessageNotification }
}
