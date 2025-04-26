import FormConsultation from '../../../src/shared/ui/FormConsultation'
import Calendar from './Calendar/Calendar'
import PaymentMethodReservation from './PaymentMethodReservation/PaymentMethodReservation'

const FormReservationCar = () => {
	return (
		<FormConsultation
			title='Понравился автомобиль?'
			description='Оставьте свои контакты, чтобы забронировать автомобиль'
			titleAction='Оставить заявку'
			action={() => undefined}
		>
			<PaymentMethodReservation />
			<Calendar />
		</FormConsultation>
	)
}

export default FormReservationCar
