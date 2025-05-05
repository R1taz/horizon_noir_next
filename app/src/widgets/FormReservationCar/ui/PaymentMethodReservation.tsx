import { PaymentMethod } from '@/app/src/shared/types/requests'
import RadioGroup from '@/app/src/shared/ui/RadioGroup'

interface Props {
	methodPayment: PaymentMethod
	setMethodPayment: (methodPayment: PaymentMethod) => void
}

const PaymentMethodReservation = ({ methodPayment, setMethodPayment }: Props) => {
	const options = [
		{ label: 'Карта', value: PaymentMethod.CARD },
		{ label: 'Наличные', value: PaymentMethod.CASH },
	]

	return (
		<RadioGroup
			title='Выберите способ оплаты'
			options={options}
			value={methodPayment}
			onChange={methodPayment => setMethodPayment(methodPayment)}
		/>
	)
}

export default PaymentMethodReservation
