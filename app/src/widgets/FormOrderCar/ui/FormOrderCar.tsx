'use client'

import PlaceDelivery from '@/app/components/Car/FormOrderCar/PlaceDelivery/PlaceDelivery'
import FormConsultation from '@/app/src/shared/ui/FormConsultation'
import PaymentMethodOrder from '@/app/components/Car/FormOrderCar/PaymentMethodOrder/PaymentMethodOrder'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useWebSocket } from '@/app/src/shared/contexts/WebSocketContext'
import { createNewOrder } from '../model/createNewOrder'

const FormOrderCar = () => {
	const [paymentMethod, setPaymentMethod] = useState('card')
	const [deliveryType, setDeliveryType] = useState('salon')
	const [deliveryDealershipId, setDeliveryDealershipId] = useState<number>(1)
	const [deliveryAddress, setDeliveryAddress] = useState('')

	const userId = useUserStore(state => state.id)
	const { carId } = useParams()

	const socket = useWebSocket()

	const handleSubmit = () => {
		createNewOrder({
			userId: userId!,
			carId: +carId,
			paymentMethod: paymentMethod,
			deliveryType: deliveryType,
			deliveryDealershipId: deliveryDealershipId,
			deliveryAddress: deliveryAddress,
			socket: socket!,
		})
	}

	return (
		<FormConsultation
			title='Готовы к покупке?'
			description='Оставьте свои контакты, чтобы заказать автомобиль'
			titleAction='Оставить заявку'
			action={handleSubmit}
		>
			<PaymentMethodOrder paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
			<PlaceDelivery
				deliveryType={deliveryType}
				deliveryAddress={deliveryAddress}
				deliveryDealershipId={deliveryDealershipId}
				setDeliveryType={setDeliveryType}
				setDeliveryAddress={setDeliveryAddress}
				setDeliveryDealershipId={setDeliveryDealershipId}
			/>
		</FormConsultation>
	)
}

export default FormOrderCar
