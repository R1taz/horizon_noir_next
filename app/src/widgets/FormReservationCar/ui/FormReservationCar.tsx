'use client'

import FormConsultation from '../../../../src/shared/ui/FormConsultation'
import Calendar from '@/app/src/features/calendar/ui/Calendar'
import PaymentMethodReservation from './PaymentMethodReservation'
import { useEffect, useState } from 'react'
import { PaymentMethod } from '@/app/src/shared/types/requests'
import ChooseTimeReservation from '@/app/src/features/choose-time-reservation/ui/ChooseTimeReservation'
import { useReservationsForMonth } from '../model/useReservationsForMonth'
import { IReservation } from '@/app/src/shared/types/reservations'
import { AnimatePresence } from 'framer-motion'
import { useNotification } from '@/app/src/shared/hooks/useNotification'
import Notification from '@/app/src/shared/ui/Notification'

const FormReservationCar = () => {
	const [reservationsForMonth, setReservationsForMonth] = useState<IReservation[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const [methodPayment, setMethodPayment] = useState<PaymentMethod>(PaymentMethod.CARD)

	const { isOpenNotification, setIsOpenNotification, messageNotification, setMessageNotification } =
		useNotification()

	const handleSubmit = () => setIsOpen(true)

	const { data } = useReservationsForMonth()

	useEffect(() => {
		if (data) {
			setReservationsForMonth(data)
		}
	}, [data])

	return (
		<>
			<FormConsultation
				title='Понравился автомобиль?'
				description='Оставьте свои контакты, чтобы забронировать автомобиль'
				titleAction='Выбрать время бронирования'
				action={handleSubmit}
			>
				<PaymentMethodReservation
					methodPayment={methodPayment}
					setMethodPayment={setMethodPayment}
				/>
				<Calendar reservationsForMonth={reservationsForMonth} />
				<AnimatePresence mode='wait'>
					{isOpen && (
						<ChooseTimeReservation
							key='choose-time-reservation'
							setMessageNotification={setMessageNotification}
							setIsOpenNotification={setIsOpenNotification}
							reservationsForMonth={reservationsForMonth}
							methodPayment={methodPayment}
							onClose={() => setIsOpen(false)}
						/>
					)}
				</AnimatePresence>
			</FormConsultation>
			<AnimatePresence mode='wait'>
				{isOpenNotification && (
					<Notification key='notification-reservation' text={messageNotification} />
				)}
			</AnimatePresence>
		</>
	)
}

export default FormReservationCar
