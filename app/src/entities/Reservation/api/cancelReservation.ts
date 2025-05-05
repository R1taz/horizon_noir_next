import { ReservationEvent } from '@/app/src/shared/types/reservations'

interface Params {
	socket: WebSocket
	reservation_id: number
}

export const cancelReservation = ({ socket, reservation_id }: Params) => {
	const reservation = {
		type: ReservationEvent.CREATE_CANCEL,
		payload: { reservation_id },
	}

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(reservation))
	} else {
		console.warn('WebSocket не подключён')
	}
}
