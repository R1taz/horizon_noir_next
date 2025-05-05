'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useOrdersStore } from '../model/useOrdersStore'
import { OrderEvent } from '../types/orders'
import { useUserStore } from '../model/useUserStore'
import { ReservationEvent } from '../types/reservations'
import { useReservationStore } from '../model/useReservationStore'

const WebSocketContext = createContext<WebSocket | null>(null)

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
	const socketRef = useRef<WebSocket | null>(null)
	const [socketReady, setSocketReady] = useState(false)

	const updateOrder = useOrdersStore(state => state.updateOrder)
	const updateReservation = useReservationStore(state => state.updateReservation)
	const increaseNumberOfWarn = useUserStore(state => state.increaseNumberOfWarn)

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:5000')
		socketRef.current = socket

		socket.onopen = () => {
			console.log('WebSocket подключён')
			setSocketReady(true)
		}

		socket.onmessage = event => {
			try {
				const data = JSON.parse(event.data)
				console.log('Получен заказ:', data.payload)

				if (
					data.type === OrderEvent.APPROVE ||
					data.type === OrderEvent.REJECT ||
					data.type === OrderEvent.FAIL ||
					data.type === OrderEvent.PAYMENT ||
					data.type === OrderEvent.CREATE_CANCEL ||
					data.type === OrderEvent.APPROVE_CANCEL ||
					data.type === OrderEvent.REJECT_CANCEL ||
					data.type === OrderEvent.CREATE_DEBT ||
					data.type === OrderEvent.COMPLETE_PAYMENT ||
					data.type === OrderEvent.COMPLETE_REFUND ||
					data.type === OrderEvent.ADD_DAY_FEE
				) {
					if (data.type === OrderEvent.FAIL || data.type === OrderEvent.APPROVE_CANCEL) {
						updateOrder(data.payload.order)
						if (data.payload.isWarn) increaseNumberOfWarn()
					} else if (data.type === OrderEvent.COMPLETE_PAYMENT) {
						updateOrder(data.payload.reservation)
					} else {
						updateOrder(data.payload)
					}
				}

				if (
					data.type === ReservationEvent.FAIL ||
					data.type === ReservationEvent.PAYMENT ||
					data.type === ReservationEvent.CREATE_CANCEL
				) {
					if (data.type === ReservationEvent.FAIL || data.type === ReservationEvent.CREATE_CANCEL) {
						updateReservation(data.payload.reservation)
						if (data.payload.isWarn) increaseNumberOfWarn()
					} else {
						updateReservation(data.payload)
					}
				}
			} catch (err) {
				console.error('Ошибка парсинга', err)
			}
		}

		socket.onerror = e => console.error('WebSocket ошибка:', e)
		socket.onclose = () => console.log('WebSocket закрыт')

		return () => socket.close()
	}, [])

	return <WebSocketContext.Provider value={socketRef.current}>{children}</WebSocketContext.Provider>
}

export const useWebSocket = () => useContext(WebSocketContext)
