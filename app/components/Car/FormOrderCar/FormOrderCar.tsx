import PlaceDelivery from './PlaceDelivery/PlaceDelivery'
import FormConsultation from '../../../src/shared/ui/FormConsultation'
import PaymentMethodOrder from './PaymentMethodOrder/PaymentMethodOrder'

const FormOrderCar = () => {
	return (
		<FormConsultation
			title='Готовы к покупке?'
			description='Оставьте свои контакты, чтобы заказать автомобиль'
			titleAction='Оставить заявку'
			action={() => undefined}
		>
			<PaymentMethodOrder />
			<PlaceDelivery />
		</FormConsultation>
	)
}

export default FormOrderCar
