import { OrderEvent } from '@/app/src/shared/types/orders'

interface Params {
	socket: WebSocket
	order_id: number
	car_location: string
	payment_parking_day: number
	number_parking_day: number
	start_parking_date: string
	end_parking_date: string
}

export function createDebt({ socket, ...debtData }: Params) {
	const order = {
		type: OrderEvent.CREATE_DEBT,
		payload: {
			...debtData,
		},
	}

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(order))
	} else {
		console.warn('Websocket не подключён')
	}
}
