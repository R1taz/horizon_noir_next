import { IReservation } from '@/app/src/shared/types/reservations'
import Request from '@/app/src/entities/Request/ui/Request'
import { easeOut, motion } from 'framer-motion'
import ReservationButtons from './ReservationButtons'

const reservationVariants = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut, delay: 0.6 } },
	exit: { opacity: 0, y: 30, transition: { duration: 0.3, ease: easeOut } },
}

interface Props {
	reservation: IReservation
}

const Reservation = ({ reservation }: Props) => {
	return (
		<motion.article variants={reservationVariants} initial='initial' animate='animate' exit='exit'>
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
				<ReservationButtons reservation={reservation} />
			</Request>
		</motion.article>
	)
}

export default Reservation
