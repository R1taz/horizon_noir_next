import React from 'react'
import Field from '../../Request/ui/Field'
import { learnDeliveryType } from '../model/learnDeliveryType'
import { IOrder } from '@/app/src/shared/types/orders'
import EditField from '../../Request/ui/EditField'
import { UserRole } from '@/app/interfaces/userInterface'
import { PaymentStatus } from '@/app/src/shared/types/requests'
import { formatPrice } from '@/app/src/shared/lib/format/formatPrice'
import { formatDateTime } from '@/app/src/shared/lib/format/formatDateTime'
import { useOrdersStore } from '@/app/src/shared/model/useOrdersStore'

interface Props {
	order: IOrder
	isEdit: boolean
	role: UserRole
}

const OrderFields = ({ order, isEdit, role }: Props) => {
	const currentEditOrder = useOrdersStore(state => state.currentEditOrder)
	const updateCurrentOrder = useOrdersStore(state => state.updateCurrentEditOrder)

	return (
		<>
			<Field title='Тип доставки' info={learnDeliveryType(order.delivery_type)!} />
			{isEdit && (
				<EditField
					width={120}
					title='Общая сумма'
					placeholder='Введите цену'
					unit='₽'
					value={currentEditOrder.amount}
					setValue={value => updateCurrentOrder('amount', value)}
				/>
			)}

			{isEdit && (
				<EditField
					width={30}
					title='Сумма предоплаты'
					placeholder='0'
					unit='%'
					value={currentEditOrder.percentPrepaymentAmount}
					setValue={value => updateCurrentOrder('percentPrepaymentAmount', value)}
				/>
			)}

			{order.car_location && <Field title='Местоположение' info={order.car_location} />}
			{(order.delivery_address || order.dealership_address) && (
				<Field title='Адрес доставки' info={order.delivery_address || order.dealership_address!} />
			)}
			{role === UserRole.ADMIN && order.payment_status === PaymentStatus.AWAITING_FINAL && (
				<EditField
					width={240}
					title='Адрес доставки'
					placeholder='Введите адрес паркинга'
					unit=''
					value={currentEditOrder.deliveryAddress}
					setValue={value => updateCurrentOrder('deliveryAddress', value)}
				/>
			)}
			{role === UserRole.ADMIN && isEdit && (
				<EditField
					title='Дата доставки'
					placeholder='01.01.2025 14:00'
					unit=''
					type='datetime-local'
					value={currentEditOrder.deliveryDate}
					setValue={value => updateCurrentOrder('deliveryDate', value)}
				/>
			)}
			{order.payment_parking_day && order.payment_status !== PaymentStatus.AWAITING_FINAL && (
				<Field title='Сумма за день паркинга' info={formatPrice(+order.payment_parking_day)} />
			)}
			{order.number_parking_day !== null &&
				order.payment_status !== PaymentStatus.AWAITING_FINAL && (
					<Field title='Количество дней на паркинге' info={String(order.number_parking_day)} />
				)}
			{order.start_parking_date && order.payment_status !== PaymentStatus.AWAITING_FINAL && (
				<Field title='Начало стоянки на паркинге' info={formatDateTime(order.start_parking_date)} />
			)}
			{order.end_parking_date && order.payment_status !== PaymentStatus.AWAITING_FINAL && (
				<Field title='Конец стоянки на паркинге' info={formatDateTime(order.end_parking_date)} />
			)}

			{role === UserRole.ADMIN && order.payment_status === PaymentStatus.AWAITING_FINAL && (
				<>
					<EditField
						width={60}
						title='Сумма за день паркинга'
						placeholder='0'
						unit='₽'
						value={currentEditOrder.paymentParkingDay}
						setValue={value => updateCurrentOrder('paymentParkingDay', value)}
					/>
					<EditField
						width={30}
						title='Количество дней на паркинге'
						placeholder='3'
						unit='д.'
						value={currentEditOrder.numberParkDay}
						setValue={value => updateCurrentOrder('numberParkDay', value)}
					/>
					<EditField
						title='Начало стоянки на паркинге'
						placeholder='01.01.2025 14:00'
						unit=''
						type='datetime-local'
						value={currentEditOrder.startParkingDate}
						setValue={value => updateCurrentOrder('startParkingDate', value)}
					/>
					<EditField
						title='Конец стоянки на паркинге'
						placeholder='03.01.2025 14:00'
						unit=''
						type='datetime-local'
						value={currentEditOrder.endParkingDate}
						setValue={value => updateCurrentOrder('endParkingDate', value)}
					/>
				</>
			)}
		</>
	)
}

export default OrderFields
