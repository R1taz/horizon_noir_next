import RadioGroup from '@/app/src/shared/ui/RadioGroup'

interface Props {
	paymentMethod: string
	setPaymentMethod: (paymentMethod: string) => void
}

const PaymentMethodOrder = ({ paymentMethod, setPaymentMethod }: Props) => {
	const options = [
		{ label: 'Карта', value: 'card' },
		{ label: 'Наличные', value: 'cash' },
	]

	return (
		<RadioGroup
			title='Выберите способ оплаты'
			options={options}
			value={paymentMethod}
			onChange={paymentMethod => setPaymentMethod(paymentMethod)}
		/>
	)
}

export default PaymentMethodOrder
