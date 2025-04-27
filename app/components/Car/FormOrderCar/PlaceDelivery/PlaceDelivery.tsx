import { useState } from 'react'
import { useCarDealerships } from '@/app/src/shared/model/useCarDealershipStore'
import RadioGroup from '@/app/src/shared/ui/RadioGroup'
import CarDealershipList from '@/app/src/entities/CarDealership/ui/CarDealershipList'

const PlaceDelivery = () => {
	const carDealerships = useCarDealerships(state => state.carDealerships)
	const [deliveryType, setDeliveryType] = useState('salon')
	const [deliveryDealershipId, setDeliveryDealershipId] = useState<number>(carDealerships[0].id)
	const [deliveryAddress, setDeliveryAddress] = useState('')

	const options = [
		{ label: 'В автосалон', value: 'salon' },
		{ label: 'Свой адрес', value: 'custom_address' },
	]

	return (
		<>
			<RadioGroup
				value={deliveryType}
				title='Выберите место доставки'
				options={options}
				onChange={deliveryType => setDeliveryType(deliveryType)}
			/>

			{deliveryType === 'salon' && (
				<CarDealershipList
					carDealerships={carDealerships}
					dealershipId={deliveryDealershipId}
					setDealershipId={setDeliveryDealershipId}
				/>
			)}

			{deliveryType === 'custom_address' && (
				<input
					type='text'
					onChange={e => setDeliveryAddress(e.target.value)}
					placeholder='Введите адрес доставки'
					className='outline-none bg-secondaryBg placeholder-[#535353] text-primary block py-2 px-2 rounded-[8px] w-[60%] mx-auto'
				/>
			)}
		</>
	)
}

export default PlaceDelivery
