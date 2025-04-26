import RadioGroup from '@/app/src/shared/ui/RadioGroup'
import { useState } from 'react'

const PaymentMethodReservation = () => {
	const [methodPayment, setMethodPayment] = useState('card')
	const options = [
		{ label: 'Карта', value: 'card' },
		{ label: 'Наличные', value: 'cash' },
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
