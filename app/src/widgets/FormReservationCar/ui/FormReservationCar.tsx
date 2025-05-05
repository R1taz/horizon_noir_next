'use client'

import FormConsultation from '../../../../src/shared/ui/FormConsultation'
import { useWebSocket } from '../../../shared/contexts/WebSocketContext'
import Calendar from '@/app/src/features/calendar/ui/Calendar'
import PaymentMethodReservation from './PaymentMethodReservation'
import { createReservation } from '../api/createReservation'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { PaymentMethod } from '@/app/src/shared/types/requests'

const FormReservationCar = () => {
	const userId = useUserStore(state => state.id)
	const { carId } = useParams()

	const [methodPayment, setMethodPayment] = useState<PaymentMethod>(PaymentMethod.CARD)
	const [reservationDate, setReservationDate] = useState('2025-05-15T17:27:00.000Z')

	const socket = useWebSocket()

	const handleSubmit = () => {
		createReservation({
			socket: socket!,
			user_id: userId!,
			car_id: +carId,
			payment_method: methodPayment,
			reservation_date: reservationDate,
		})
	}

	return (
		<FormConsultation
			title='Понравился автомобиль?'
			description='Оставьте свои контакты, чтобы забронировать автомобиль'
			titleAction='Оставить заявку'
			action={handleSubmit}
		>
			<PaymentMethodReservation methodPayment={methodPayment} setMethodPayment={setMethodPayment} />
			<Calendar />
		</FormConsultation>
	)
}

export default FormReservationCar
