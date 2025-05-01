'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useOrdersStore } from '../model/useOrdersStore'

const WebSocketContext = createContext<WebSocket | null>(null)

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
	const socketRef = useRef<WebSocket | null>(null)
	const [socketReady, setSocketReady] = useState(false)

	const addOrder = useOrdersStore(state => state.addOrder)

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
				console.log(data)
				if (data.type === 'NEW_ORDER') {
					console.log('Получен заказ:', data.payload)
					addOrder(data.payload)
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
