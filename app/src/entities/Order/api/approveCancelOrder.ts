import { OrderEvent } from '@/app/src/shared/types/orders'

interface Params {
	socket: WebSocket
	order_id: number
}

export const approveCancelOrder = ({ socket, order_id }: Params) => {
	const order = {
		type: OrderEvent.APPROVE_CANCEL,
		payload: {
			order_id,
		},
	}

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(order))
	} else {
		console.warn('WebSocket не подключён')
	}
}
