import { OrderEvent } from '@/app/src/shared/types/orders'
import { PaymentStatus } from '@/app/src/shared/types/requests'

interface Params {
	socket: WebSocket
	order_id: number
	payment_status: PaymentStatus
}

export function paymentOrder({ socket, order_id, payment_status }: Params) {
	const order = {
		type: OrderEvent.PAYMENT,
		payload: {
			order_id,
			payment_status,
		},
	}

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(order))
	} else {
		console.warn('WebSocket не подключён')
	}
}
