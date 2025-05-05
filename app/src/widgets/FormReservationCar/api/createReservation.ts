import { PaymentMethod } from '@/app/src/shared/types/requests'
import { ReservationEvent } from '@/app/src/shared/types/reservations'

interface Params {
	socket: WebSocket
	user_id: number
	car_id: number
	payment_method: PaymentMethod
	reservation_date: string
}

export const createReservation = ({
	socket,
	user_id,
	car_id,
	payment_method,
	reservation_date,
}: Params) => {
	const reservation = {
		type: ReservationEvent.CREATE,
		payload: { user_id, car_id, payment_method, reservation_date },
	}

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(reservation))
	} else {
		console.warn('WebSocket не подключён')
	}
}
