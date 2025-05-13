'use client'

import { IReservation } from '@/app/src/shared/types/reservations'
import { UserRole } from '../../car'
import { PaymentStatus, RefundStatus } from '@/app/src/shared/types/requests'
import RequestButton from '../../Request/ui/RequestButton'
import { useAuthStore } from '@/app/src/widgets/cars'
import { completeRefund } from '../api/completeRefund'
import { completePayment } from '../api/completePayment'
import { paymentReservation } from '../api/paymentReservation'
import { cancelReservation } from '../api/cancelReservation'
import { failReservation } from '../api/failReservation'
import { useWebSocket } from '@/app/src/shared/contexts/WebSocketContext'

interface Props {
	reservation: IReservation
}

const ReservationButtons = ({ reservation }: Props) => {
	const role = useAuthStore(state => state.role)

	const socket = useWebSocket()

	const handleFailReservation = () => {
		failReservation({ socket: socket!, reservation_id: reservation.id })
	}
	const handleCancelReservation = () => {
		cancelReservation({ socket: socket!, reservation_id: reservation.id })
	}
	const handlePaymentReservation = (paymentStatus: PaymentStatus) => {
		paymentReservation({
			socket: socket!,
			reservation_id: reservation.id,
			payment_status: paymentStatus,
		})
	}
	const handleCompletePayment = () => {
		completePayment({ socket: socket!, reservation_id: reservation.id })
	}
	const handleCompleteRefund = () => {
		completeRefund({ socket: socket!, reservation_id: reservation.id })
	}

	return (
		<section className='flex flex-col my-5 gap-3'>
			{role === UserRole.USER &&
				reservation.payment_status === PaymentStatus.AWAITING_PREPAYMENT && (
					<>
						<RequestButton
							title='Оплатить'
							type='400'
							action={() => {
								handlePaymentReservation(PaymentStatus.PREPAYMENT_DONE)
							}}
						/>
						<RequestButton
							title='Отменить бронирование'
							type='500'
							action={() => {
								handleFailReservation()
							}}
						/>
					</>
				)}

			{role === UserRole.USER && reservation.payment_status === PaymentStatus.AWAITING_FINAL && (
				<RequestButton title='Оплатить' type='400' action={handleCompletePayment} />
			)}

			{role === UserRole.USER &&
				(reservation.payment_status === PaymentStatus.PREPAYMENT_DONE ||
					reservation.payment_status === PaymentStatus.AWAITING_FINAL) && (
					<RequestButton
						title='Отменить бронирование'
						type='500'
						action={handleCancelReservation}
					/>
				)}

			{role === UserRole.ADMIN && reservation.refund_status === RefundStatus.IN_PROGRESS && (
				<RequestButton title='Совершить возврат' type='400' action={handleCompleteRefund} />
			)}
		</section>
	)
}

export default ReservationButtons
