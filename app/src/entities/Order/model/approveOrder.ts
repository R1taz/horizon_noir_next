import { DeliveryType, OrderEvent, PaymentStatus } from '@/app/src/shared/types/orders'

interface Params {
	socket: WebSocket
	order_id: number
	amount: number
	percent_prepayment_amount: number
	manager_id: number
	payment_method?: PaymentStatus
	delivery_type?: DeliveryType
	delivery_address?: string
	delivery_dealership_id?: number
}

export const approveOrder = (params: Params) => {
	if (!params.percent_prepayment_amount) {
		console.log('Не задан процент для предоплаты')
		return
	}

	const order = {
		type: OrderEvent.APPROVE,
		payload: {
			order_id: params.order_id,
			amount: params.amount,
			percent_prepayment_amount: params.percent_prepayment_amount,
			manager_id: params.manager_id,
			...(params.payment_method ? { payment_method: params.payment_method } : {}),
			...(params.delivery_type ? { delivery_type: params.delivery_type } : {}),
			...(params.delivery_address ? { delivery_address: params.delivery_address } : {}),
			...(params.delivery_dealership_id
				? { delivery_dealership_id: params.delivery_dealership_id }
				: {}),
		},
	}

	if (params.socket && params.socket.readyState === WebSocket.OPEN) {
		params.socket.send(JSON.stringify(order))
	} else {
		console.warn('WebSocket не подключён')
	}
}
