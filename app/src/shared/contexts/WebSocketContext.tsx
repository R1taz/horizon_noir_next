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
		if (!role) return

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
						if (role === UserRole.USER) {
							setOpen(false)
							setMessage('')

							setOpen(true)
							setMessage('Заказ успешно создан и добавлен в ваш профиль')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.APPROVE:
						updateOrder(data.payload)

						setOpen(true)
						setMessage('Заказ одобрен')

						setTimeout(() => {
							setOpen(false)
							setMessage('')
						}, 2000)
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.REJECT:
						updateOrder(data.payload)

						setOpen(true)
						setMessage('Заказ отклонён')

						setTimeout(() => {
							setOpen(false)
							setMessage('')
						}, 2000)
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.FAIL:
						updateOrder(data.payload.order)
						if (data.payload.isWarn) {
							increaseNumberOfWarn()

							setOpen(true)
							setMessage('Заказ аннулирован. Выдано предупреждение')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						} else if (role === UserRole.USER) {
							setOpen(true)
							setMessage('Заказ успешно отменён')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}

						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.PAYMENT:
						updateOrder(data.payload)
						if (data.payload.payment_status === PaymentStatus.AWAITING_FINAL) {
							setOpen(true)
							setMessage('Заказ доставлен')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						} else if (
							data.payload.payment_status === PaymentStatus.PREPAYMENT_DONE &&
							role === UserRole.USER
						) {
							setOpen(true)
							setMessage('Предоплата успешно внесена')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						} else if (role === UserRole.USER) {
							setOpen(true)
							setMessage('Заказ успешно оплачен. Поздравляем с покупкой!')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}

						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.CREATE_CANCEL:
						updateOrder(data.payload)

						if (role === UserRole.USER) {
							setOpen(true)
							setMessage('Заявка на возврат успешно отправлена')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}

						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.APPROVE_CANCEL:
						updateOrder(data.payload.order)
						if (data.payload.isWarn) increaseNumberOfWarn()
						const messageApprove = data.payload.isWarn
							? 'Заявка на возврат одобрена. Выдано предупреждение'
							: 'Заявка на возврат одобрена'

						setOpen(true)
						setMessage(messageApprove)

						setTimeout(() => {
							setOpen(false)
							setMessage('')
						}, 2000)

						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.REJECT_CANCEL:
						updateOrder(data.payload)

						setOpen(true)
						setMessage('Заявка на возврат отклонена')

						setTimeout(() => {
							setOpen(false)
							setMessage('')
						}, 2000)
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.CREATE_DEBT:
						updateOrder(data.payload)

						if (role === UserRole.USER) {
							setOpen(true)
							setMessage('Вам пришла задолженность')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}

						if (role === UserRole.ADMIN || role === UserRole.MANAGER) {
							setOpen(true)
							setMessage('Задолженность успешно создана')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.COMPLETE_PAYMENT:
						updateOrder(data.payload)
						if (role === UserRole.USER) {
							setOpen(true)
							setMessage('Оплата успешно внесена. Поздравляем с покупкой!')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.COMPLETE_REFUND:
						updateOrder(data.payload)
						setOpen(true)
						setMessage('Средства успешно возвращены')

						setTimeout(() => {
							setOpen(false)
							setMessage('')
						}, 2000)
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break

					case OrderEvent.ADD_DAY_FEE:
						updateOrder(data.payload)
						queryClient.invalidateQueries({ queryKey: ['orders'] })
						break
				}

				switch (data.type) {
					case ReservationEvent.CREATE:
						setOpen(false)
						setMessage('')

						if (role === UserRole.USER) {
							setOpen(true)
							setMessage('Заявка на бронирование успешно создана и добавлена в ваш профиль')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}
						queryClient.invalidateQueries({ queryKey: ['reservations-for-month'] })
						break

					case ReservationEvent.FAIL:
						updateReservation(data.payload.reservation)

						if (data.payload.isWarn && role === UserRole.USER) {
							increaseNumberOfWarn()

							setOpen(true)
							setMessage('Заказ успешно отменён. Выдано предупреждение')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						} else if (role === UserRole.USER) {
							setOpen(true)
							setMessage('Заказ успешно отменён')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}

						queryClient.invalidateQueries({ queryKey: ['reservations'] })
						queryClient.invalidateQueries({ queryKey: ['reservations-for-month'] })
						break

					case ReservationEvent.PAYMENT:
						updateReservation(data.payload)

						if (data.payload.payment_status === PaymentStatus.AWAITING_FINAL) {
							setOpen(true)
							setMessage('Заказ доставлен')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						} else if (
							data.payload.payment_status === PaymentStatus.PREPAYMENT_DONE &&
							role === UserRole.USER
						) {
							setOpen(true)
							setMessage('Предоплата успешно внесена')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						} else if (role === UserRole.USER) {
							setOpen(true)
							setMessage('Заявка на бронирование успешно оплачена. Поздравляем с покупкой!')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}

						queryClient.invalidateQueries({ queryKey: ['reservations'] })
						queryClient.invalidateQueries({ queryKey: ['reservations-for-month'] })
						break

					case ReservationEvent.CREATE_CANCEL:
						updateReservation(data.payload.reservation)

						if (data.payload.isWarn && role === UserRole.USER) {
							increaseNumberOfWarn()

							setOpen(true)
							setMessage('Заявка на возврат успешно создана. Выдано предупреждение')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						} else if (role === UserRole.USER) {
							setOpen(true)
							setMessage('Заявка на возврат успешно создана')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}

						queryClient.invalidateQueries({ queryKey: ['reservations'] })
						queryClient.invalidateQueries({ queryKey: ['reservations-for-month'] })
						break

					case ReservationEvent.COMPLETE_PAYMENT:
						updateReservation(data.payload)

						if (role === UserRole.USER) {
							setOpen(true)
							setMessage('Заказ успешно оплачен. Поздравляем с покупкой!')

							setTimeout(() => {
								setOpen(false)
								setMessage('')
							}, 2000)
						}

						queryClient.invalidateQueries({ queryKey: ['reservations'] })
						queryClient.invalidateQueries({ queryKey: ['reservations-for-month'] })
						break

					case ReservationEvent.COMPLETE_REFUND:
						updateReservation(data.payload)
						setOpen(true)
						setMessage('Средства успешно возвращены')

						setTimeout(() => {
							setOpen(false)
							setMessage('')
						}, 2000)

						queryClient.invalidateQueries({ queryKey: ['reservations'] })
						queryClient.invalidateQueries({ queryKey: ['reservations-for-month'] })
						break
				}
			} catch (err) {
				console.error('Ошибка парсинга', err)
			}
		}

		socket.onerror = e => console.error('WebSocket ошибка:', e)
		socket.onclose = () => console.log('WebSocket закрыт')

		return () => socket.close()
	}, [role])

	return <WebSocketContext.Provider value={socketRef.current}>{children}</WebSocketContext.Provider>
}

export const useWebSocket = () => useContext(WebSocketContext)
