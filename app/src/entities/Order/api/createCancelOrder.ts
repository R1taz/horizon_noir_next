import { OrderEvent } from '@/app/src/shared/types/orders'

interface Params {
	socket: WebSocket
	order_id: number
	refund_message?: string
}

export function createCancelOrder({ socket, order_id, refund_message }: Params) {
	const order = {
		type: OrderEvent.CREATE_CANCEL,
		payload: {
			order_id,
			...(refund_message ? { refund_message } : {}),
		},
	}

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(order))
	} else {
		console.warn('Websocket не подключён')
	}
}
