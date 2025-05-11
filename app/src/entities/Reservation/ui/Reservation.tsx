import { useState } from 'react'
import { useAuthStore, UserRole } from '@/app/src/widgets/cars'
import { useWebSocket } from '@/app/src/shared/contexts/WebSocketContext'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { IReservation } from '@/app/src/shared/types/reservations'
import Request from '@/app/src/entities/Request/ui/Request'
import { PaymentStatus, RefundStatus } from '@/app/src/shared/types/requests'
import RequestButton from '../../Request/ui/RequestButton'
import { failReservation } from '../api/failReservation'
import { paymentReservation } from '../api/paymentReservation'
import { cancelReservation } from '../api/cancelReservation'
import { completePayment } from '../api/completePayment'
import { completeRefund } from '../api/completeRefund'

interface Props {
	reservation: IReservation
}

const Reservation = ({ reservation }: Props) => {
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
		<Request
			brandName={reservation.brand_name}
			modelName={reservation.model_name}
			paymentMethod={reservation.payment_method}
			mainPhotoUrl={reservation.main_photo_url}
			requestStatus={reservation.reservation_status}
			titleDeliveryDate='Дата бронирования'
			deliveryDate={reservation.reservation_date}
			amount={+reservation.amount}
			prepaymentAmount={+reservation.prepayment_amount}
			paymentStatus={reservation.payment_status}
		>
			<div className='flex flex-col my-5 gap-3'>
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
			</div>
		</Request>
	)
}

export default Reservation
