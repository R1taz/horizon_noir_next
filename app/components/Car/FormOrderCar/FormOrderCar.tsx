import PlaceDelivery from './PlaceDelivery/PlaceDelivery'
import FormConsultation from '../../ui/FormConsultation'
import PaymentMethod from '../../ui/PaymentMethod'

const FormOrderCar = () => {
	return (
		<FormConsultation
			title='Готовы к покупке?'
			description='Оставьте свои контакты, чтобы заказать автомобиль'
			titleAction='Оставить заявку'
			action={() => undefined}
		>
			<PaymentMethod />
			<PlaceDelivery />
		</FormConsultation>
	)
}

export default FormOrderCar
