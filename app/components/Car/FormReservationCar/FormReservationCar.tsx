import PaymentMethod from '../../ui/PaymentMethod'
import FormConsultation from '../../ui/FormConsultation'
import Calendar from './Calendar/Calendar'

const FormReservationCar = () => {
	return (
		<FormConsultation
			title='Понравился автомобиль?'
			description='Оставьте свои контакты, чтобы забронировать автомобиль'
			titleAction='Оставить заявку'
			action={() => undefined}
		>
			<PaymentMethod />
			<Calendar />
		</FormConsultation>
	)
}

export default FormReservationCar
