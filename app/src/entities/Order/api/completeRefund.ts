import { OrderEvent } from '@/app/src/shared/types/orders'

interface Props {
	socket: WebSocket
	order_id: number
}

export function completeRefund({ socket, order_id }: Props) {
	const order = {
		type: OrderEvent.COMPLETE_REFUND,
		payload: { order_id },
	}

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(order))
	} else {
		console.warn('WebSocket не подключён')
	}
}
