import { OrderEvent } from '@/app/src/shared/types/orders'

interface Params {
	socket: WebSocket
	order_id: number
	manager_id: number
}

export const rejectOrder = ({ socket, order_id, manager_id }: Params) => {
	const order = {
		type: OrderEvent.REJECT,
		payload: {
			order_id: order_id,
			manager_id: manager_id,
		},
	}

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(order))
	} else {
		console.warn('WebSocket не подключён')
	}
}
