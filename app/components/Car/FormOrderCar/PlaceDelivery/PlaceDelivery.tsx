import { useCarDealerships } from '@/app/src/shared/model/useCarDealershipStore'
import RadioGroup from '@/app/src/shared/ui/RadioGroup'
import CarDealershipList from '@/app/src/entities/CarDealership/ui/CarDealershipList'

interface Props {
	deliveryType: string
	deliveryAddress: string
	deliveryDealershipId: number
	setDeliveryType: (deliveryType: string) => void
	setDeliveryAddress: (address: string) => void
	setDeliveryDealershipId: (id: number) => void
}

const PlaceDelivery = (props: Props) => {
	const carDealerships = useCarDealerships(state => state.carDealerships)

	const options = [
		{ label: 'В автосалон', value: 'salon' },
		{ label: 'Свой адрес', value: 'custom_address' },
	]

	return (
		<>
			<RadioGroup
				value={props.deliveryType}
				title='Выберите место доставки'
				options={options}
				onChange={deliveryType => props.setDeliveryType(deliveryType)}
			/>

			{props.deliveryType === 'salon' && (
				<CarDealershipList
					carDealerships={carDealerships}
					dealershipId={props.deliveryDealershipId}
					setDealershipId={props.setDeliveryDealershipId}
				/>
			)}

			{props.deliveryType === 'custom_address' && (
				<input
					type='text'
					value={props.deliveryAddress}
					onChange={e => props.setDeliveryAddress(e.target.value)}
					placeholder='Введите адрес доставки'
					className=' bg-700 placeholder-[600] text-400 block py-2 px-2 rounded-[8px] w-[60%] mx-auto'
				/>
			)}
		</>
	)
}

export default PlaceDelivery
