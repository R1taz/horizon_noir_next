import { useState } from 'react'
import { useAuthStore, UserRole } from '@/app/src/widgets/cars'
import { IOrder } from '@/app/src/shared/types/orders'
import { RequestStatus, PaymentStatus, RefundStatus } from '../../../shared/types/requests'
import OrderButton from './OrderButton'
import Field from './Field'
import { learnOrderStatus } from '../../Request/model/learnOrderStatus'
import { learnPaymentStatus } from '../../Request/model/learnPaymentStatus'
import { learnPaymentMethod } from '../../Request/model/learnPaymentMethod'
import EditField from './EditField'
import { learnDeliveryType } from '../model/learnDeliveryType'
import { approveOrder } from '../api/approveOrder'
import { useWebSocket } from '@/app/src/shared/contexts/WebSocketContext'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { rejectOrder } from '../api/rejectOrder'
import { failOrder } from '../api/failOrder'
import { paymentOrder } from '../api/paymentOrder'
import { createCancelOrder } from '../api/createCancelOrder'
import { learnRefundStatus } from '../../Request/model/learnRefundStatus'
import { approveCancelOrder } from '../api/approveCancelOrder'
import { rejectCancelOrder } from '../api/rejectCancelOrder'
import { createDebt } from '../api/createDebt'
import { completePayment } from '../api/completePayment'
import { completeRefund } from '../api/completeRefund'
import { formatDateTime } from '@/app/src/shared/lib/format/formatDateTime'
import { formatPrice } from '@/app/src/shared/lib/format/formatPrice'

interface Props {
	order: IOrder
}

const Order = ({ order }: Props) => {
	const userId = useUserStore(state => state.id)
	const role = useAuthStore(state => state.role)
	const [isEdit, setIsEdit] = useState(false)

	const [amount, setAmount] = useState('')
	const [percentPrepaymentAmount, setPercentPrepaymentAmount] = useState('')

	const [deliveryAddress, setDeliveryAddress] = useState('')
	const [deliveryDate, setDeliveryDate] = useState('')
	const [numberParkDay, setNumberParkDay] = useState('')
	const [paymentParkingDay, setPaymentParkingDay] = useState('')
	const [startParkingDate, setStartParkingDate] = useState('')
	const [endParkingDate, setEndParkingDate] = useState('')

	const socket = useWebSocket()

	const handleApproveOrder = () => {
		approveOrder({
			socket: socket!,
			order_id: order.id,
			amount: +amount,
			percent_prepayment_amount: +percentPrepaymentAmount,
			manager_id: userId!,
			delivery_date: new Date(deliveryDate).toISOString(),
		})
		setIsEdit(false)
		setAmount('')
		setPercentPrepaymentAmount('')
		setDeliveryDate('')
	}
	const handleRejectOrder = () => {
		rejectOrder({ socket: socket!, order_id: order.id, manager_id: userId! })
	}
	const handleFailOrder = () => {
		failOrder({ socket: socket!, order_id: order.id })
	}
	const handlePaymentOrder = (paymentStatus: PaymentStatus) => {
		paymentOrder({ socket: socket!, order_id: order.id, payment_status: paymentStatus })
	}
	const handleCompletePayment = () => completePayment({ socket: socket!, order_id: order.id })
	const handleCancelOrder = () => createCancelOrder({ socket: socket!, order_id: order.id })
	const handleApproveCancelOrder = () => approveCancelOrder({ socket: socket!, order_id: order.id })
	const handleRejectCancelOrder = () => rejectCancelOrder({ socket: socket!, order_id: order.id })
	const handleCreateDebt = () => {
		createDebt({
			socket: socket!,
			order_id: order.id,
			car_location: deliveryAddress,
			number_parking_day: +numberParkDay,
			payment_parking_day: +paymentParkingDay,
			start_parking_date: new Date(startParkingDate).toISOString(),
			end_parking_date: new Date(endParkingDate).toISOString(),
		})
		setDeliveryAddress('')
		setNumberParkDay('')
		setPaymentParkingDay('')
		setStartParkingDate('')
		setEndParkingDate('')
	}
	const handleCompleteRefund = () => completeRefund({ socket: socket!, order_id: order.id })

	return (
		<article className='flex flex-col bg-secondaryBg rounded-[8px] pb-3'>
			<img
				src={
					process.env.NEXT_PUBLIC_BASE_BACKEND_URL + '/' + order.main_photo_url.replace(/\\/g, '/')
				}
				alt='Фотография автомобиля'
			/>

			<h3 className='text-center text-headlines font-medium text-xl mt-3 mb-2'>
				{order.brand_name} {order.model_name}
			</h3>
			<section className='px-3 flex flex-col gap-3'>
				<Field title='Тип заявки' info='Заказ' />

				<Field title='Статус сделки' info={learnOrderStatus(order.order_status)!} />

				{order.payment_status && (
					<Field title='Статус платежа' info={learnPaymentStatus(order.payment_status)!} />
				)}

				{!isEdit && order.amount && <Field title='Общая сумма' info={formatPrice(+order.amount)} />}
				{isEdit && (
					<EditField
						width={120}
						title='Общая сумма'
						placeholder='Введите цену'
						unit='₽'
						value={amount}
						setValue={value => setAmount(value)}
					/>
				)}

				{!isEdit && order.prepayment_amount && (
					<Field title='Сумма предоплаты' info={formatPrice(+order.prepayment_amount)} />
				)}
				{isEdit && (
					<EditField
						width={30}
						title='Сумма предоплаты'
						placeholder='0'
						unit='%'
						value={percentPrepaymentAmount}
						setValue={value => setPercentPrepaymentAmount(value)}
					/>
				)}

				<Field title='Метод оплаты' info={learnPaymentMethod(order.payment_method)!} />
				<Field title='Тип доставки' info={learnDeliveryType(order.delivery_type)!} />

				{order.car_location && <Field title='Местоположение' info={order.car_location} />}
				{(order.delivery_address || order.dealership_address) && (
					<Field
						title='Адрес доставки'
						info={order.delivery_address || order.dealership_address!}
					/>
				)}
				{role === UserRole.ADMIN && order.payment_status === PaymentStatus.AWAITING_FINAL && (
					<EditField
						width={240}
						title='Адрес доставки'
						placeholder='Введите адрес паркинга'
						unit=''
						value={deliveryAddress}
						setValue={setDeliveryAddress}
					/>
				)}

				{!isEdit && order.delivery_date && (
					<Field title='Дата доставки' info={formatDateTime(order.delivery_date)} />
				)}
				{role === UserRole.ADMIN && isEdit && (
					<EditField
						title='Дата доставки'
						placeholder='01.01.2025 14:00'
						unit=''
						type='datetime-local'
						value={deliveryDate}
						setValue={value => setDeliveryDate(value)}
					/>
				)}

				{order.refund_status && (
					<Field title='Статус возврата платежа' info={learnRefundStatus(order.refund_status)!} />
				)}
				{order.refund_amount && (
					<Field title='Сумма возврата платежа' info={formatPrice(+order.refund_amount)} />
				)}
				{order.refund_message && <Field title='Причина возврата' info={order.refund_message} />}

				{order.payment_parking_day && order.payment_status !== PaymentStatus.AWAITING_FINAL && (
					<Field title='Сумма за день паркинга' info={String(order.payment_parking_day)} />
				)}
				{order.number_parking_day !== null &&
					order.payment_status !== PaymentStatus.AWAITING_FINAL && (
						<Field title='Количество дней на паркинге' info={String(order.number_parking_day)} />
					)}
				{order.start_parking_date && order.payment_status !== PaymentStatus.AWAITING_FINAL && (
					<Field
						title='Начало стоянки на паркинге'
						info={formatDateTime(order.start_parking_date)}
					/>
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
							value={paymentParkingDay}
							setValue={setPaymentParkingDay}
						/>
						<EditField
							width={30}
							title='Количество дней на паркинге'
							placeholder='3'
							unit='д.'
							value={numberParkDay}
							setValue={setNumberParkDay}
						/>
						<EditField
							title='Начало стоянки на паркинге'
							placeholder='01.01.2025 14:00'
							unit=''
							type='datetime-local'
							value={startParkingDate}
							setValue={setStartParkingDate}
						/>
						<EditField
							title='Конец стоянки на паркинге'
							placeholder='03.01.2025 14:00'
							unit=''
							type='datetime-local'
							value={endParkingDate}
							setValue={setEndParkingDate}
						/>
					</>
				)}
			</section>

			<div className='flex flex-col my-5 gap-3'>
				{isEdit && role === UserRole.ADMIN && order.order_status === RequestStatus.PENDING && (
					<OrderButton type='primary' action={handleApproveOrder} title='Одобрить' />
				)}
				{role === UserRole.ADMIN && order.order_status === RequestStatus.PENDING && (
					<OrderButton
						type={!isEdit ? 'primary' : 'secondary'}
						action={() => setIsEdit(prev => !prev)}
						title={!isEdit ? 'Редактировать' : 'Отменить редактирование'}
					/>
				)}
				{!isEdit && role === UserRole.ADMIN && order.order_status === RequestStatus.PENDING && (
					<OrderButton type='secondary' action={handleRejectOrder} title='Отклонить' />
				)}

				{role === UserRole.USER &&
					(order.payment_status === PaymentStatus.AWAITING_PREPAYMENT ||
						order.payment_status === PaymentStatus.AWAITING_FINAL ||
						order.payment_status === PaymentStatus.DEBT) &&
					(!order.refund_status || order.refund_status === RefundStatus.FAILED) && (
						<OrderButton
							title='Оплатить'
							type='primary'
							action={() => {
								if (order.payment_status === PaymentStatus.AWAITING_PREPAYMENT) {
									handlePaymentOrder(PaymentStatus.PREPAYMENT_DONE)
								} else {
									handleCompletePayment()
								}
							}}
						/>
					)}

				{role === UserRole.USER && order.payment_status === PaymentStatus.AWAITING_PREPAYMENT && (
					<OrderButton title='Отменить заказ' type='secondary' action={handleFailOrder} />
				)}

				{((role === UserRole.USER && order.payment_status === PaymentStatus.PREPAYMENT_DONE) ||
					(role === UserRole.USER && order.payment_status === PaymentStatus.AWAITING_FINAL) ||
					(role === UserRole.USER && order.payment_status === PaymentStatus.DEBT)) &&
					(order.refund_status === null || order.refund_status === RefundStatus.FAILED) && (
						<OrderButton title='Отменить заказ' type='secondary' action={handleCancelOrder} />
					)}

				{role === UserRole.ADMIN &&
					order.payment_status === PaymentStatus.AWAITING_FINAL &&
					(!order.refund_status || order.refund_status === RefundStatus.FAILED) && (
						<OrderButton title='Создать задолженность' type='primary' action={handleCreateDebt} />
					)}

				{role === UserRole.ADMIN && order.refund_status === RefundStatus.PENDING && (
					<>
						<OrderButton
							title='Одобрить возврат'
							type='primary'
							action={handleApproveCancelOrder}
						/>
						<OrderButton
							title='Отклонить возврат'
							type='secondary'
							action={handleRejectCancelOrder}
						/>
					</>
				)}

				{role === UserRole.ADMIN && order.refund_status === RefundStatus.IN_PROGRESS && (
					<OrderButton title='Совершить возврат' type='primary' action={handleCompleteRefund} />
				)}
			</div>
		</article>
	)
}

export default Order
