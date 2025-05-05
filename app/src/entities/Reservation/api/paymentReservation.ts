import { PaymentStatus } from '@/app/src/shared/types/requests'
import { ReservationEvent } from '@/app/src/shared/types/reservations'

interface Params {
	socket: WebSocket
	reservation_id: number
	payment_status: PaymentStatus
}

export const paymentReservation = ({ socket, reservation_id, payment_status }: Params) => {
	const reservation = {
		type: ReservationEvent.PAYMENT,
		payload: { reservation_id, payment_status },
	}

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(reservation))
	} else {
		console.warn('WebSocket не подключён')
	}
}
