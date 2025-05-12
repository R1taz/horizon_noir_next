'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useOrdersStore } from '../model/useOrdersStore'
import { OrderEvent } from '../types/orders'
import { useUserStore } from '../model/useUserStore'
import { ReservationEvent } from '../types/reservations'
import { useReservationStore } from '../model/useReservationStore'
import { useQueryClient } from '@tanstack/react-query'
import { useNotificationStore } from '../model/useNotificationStore'
import { useAuthStore } from '../model/useAuthStore'
import { UserRole } from '@/app/interfaces/userInterface'
import { PaymentStatus } from '../types/requests'

const WebSocketContext = createContext<WebSocket | null>(null)

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
	const socketRef = useRef<WebSocket | null>(null)
	const [socketReady, setSocketReady] = useState(false)

	const updateOrder = useOrdersStore(state => state.updateOrder)
	const updateReservation = useReservationStore(state => state.updateReservation)
	const increaseNumberOfWarn = useUserStore(state => state.increaseNumberOfWarn)

	const role = useAuthStore(state => state.role)
	const setOpen = useNotificationStore(state => state.setIsOpenNotification)
	const setMessage = useNotificationStore(state => state.setMessageNotification)

	const queryClient = useQueryClient()

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

				switch (data.type) {
					case OrderEvent.CREATE:
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.APPROVE:
						updateOrder(data.payload)
						setOpen(true)
						setMessage('Заказ одобрен')
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.REJECT:
						updateOrder(data.payload)
						setOpen(true)
						setMessage('Заказ отклонён')
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.FAIL:
						updateOrder(data.payload.order)
						if (data.payload.isWarn) {
							increaseNumberOfWarn()

							setTimeout(() => {
								setOpen(true)
								setMessage(
									'Заказ аннулирован в связи с нарушением условий оплаты в установленный срок. Вам выдано предупреждение Автомобиль возвращён на склад.'
								)
							}, 2000)
						}

						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.PAYMENT:
						updateOrder(data.payload)
						if (data.payload.payment_status === PaymentStatus.AWAITING_FINAL) {
							setOpen(true)
							setMessage('Заказ доставлен')
						}
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.CREATE_CANCEL:
						updateOrder(data.payload)
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.APPROVE_CANCEL:
						updateOrder(data.payload.order)
						if (data.payload.isWarn) increaseNumberOfWarn()
						const messageApprove = data.payload.isWarn
							? 'Заявка на возврат одобренаЗаявка на возврат одобрена. Вам выдано предупреждение'
							: 'Заявка на возврат одобрена'

						setOpen(true)
						setMessage(messageApprove)
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.REJECT_CANCEL:
						updateOrder(data.payload)
						setOpen(true)
						setMessage('Заявка на возврат отклонена')
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.CREATE_DEBT:
						updateOrder(data.payload)

						if (role === UserRole.USER) {
							setOpen(true)
							setMessage('Вам пришла задолженность')
						}

						if (role === UserRole.ADMIN || role === UserRole.MANAGER) {
							setOpen(true)
							setMessage('Задолженность успешно создана')
						}
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.COMPLETE_PAYMENT:
						updateOrder(data.payload)
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.COMPLETE_REFUND:
						updateOrder(data.payload)
						setOpen(true)
						setMessage('Средства успешно возвращены')
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.ADD_DAY_FEE:
						updateOrder(data.payload)
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break
				}

				/* if (

					data.type === OrderEvent.COMPLETE_PAYMENT ||
					data.type === OrderEvent.COMPLETE_REFUND ||
					data.type === OrderEvent.ADD_DAY_FEE
				 */

				if (data.type === ReservationEvent.CREATE) {
					queryClient.invalidateQueries({ queryKey: ['reservations-for-month'] })
				}

				if (
					data.type === ReservationEvent.FAIL ||
					data.type === ReservationEvent.PAYMENT ||
					data.type === ReservationEvent.CREATE_CANCEL ||
					data.type === ReservationEvent.COMPLETE_PAYMENT ||
					data.type === ReservationEvent.COMPLETE_REFUND
				) {
					if (data.type === ReservationEvent.FAIL || data.type === ReservationEvent.CREATE_CANCEL) {
						updateReservation(data.payload.reservation)
						if (data.payload.isWarn) increaseNumberOfWarn()
					} else {
						updateReservation(data.payload)
					}
					queryClient.invalidateQueries({ queryKey: ['reservations'] })
					queryClient.invalidateQueries({ queryKey: ['reservations-for-month'] })
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
