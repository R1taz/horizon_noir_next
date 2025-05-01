'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useOrdersStore } from '../model/useOrdersStore'
import { OrderEvent } from '../types/orders'

const WebSocketContext = createContext<WebSocket | null>(null)

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
	const socketRef = useRef<WebSocket | null>(null)
	const [socketReady, setSocketReady] = useState(false)

	const addOrder = useOrdersStore(state => state.addOrder)
	const updateOrder = useOrdersStore(state => state.updateOrder)

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

				if (data.type === OrderEvent.CREATE) {
					addOrder(data.payload)
				}
				if (data.type === OrderEvent.APPROVE || data.type === OrderEvent.REJECT) {
					updateOrder(data.payload)
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
