import { OrderEvent } from '@/app/src/shared/types/orders'

interface Params {
	socket: WebSocket
	order_id: number
	refund_message?: string
}

export const rejectCancelOrder = ({ socket, order_id, refund_message }: Params) => {
	const order = {
		type: OrderEvent.REJECT_CANCEL,
		payload: {
			order_id,
			...(refund_message ? { refund_message } : {}),
		},
	}

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(order))
	} else {
		console.warn('WebSocket не подключён')
	}
}
