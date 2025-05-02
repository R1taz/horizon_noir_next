import { OrderEvent } from '@/app/src/shared/types/orders'

interface Params {
	socket: WebSocket
	order_id: number
	refund_message?: string
}

export const failOrder = ({ socket, order_id, refund_message }: Params) => {
	const order = {
		type: OrderEvent.FAIL,
		payload: {
			order_id: order_id,
			...(refund_message ? { refund_message } : {}),
		},
	}

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(order))
	} else {
		console.warn('WebSocket не подключён')
	}
}
