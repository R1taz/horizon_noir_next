import Image from 'next/image'
import photoCar from '../../../../assets/image.png'
import { useState } from 'react'
import { useAuthStore, UserRole } from '@/app/src/widgets/cars'
import { IOrder, OrderStatus } from '@/app/src/shared/types/orders'
import OrderButton from './OrderButton'
import Field from './Field'
import { learnOrderStatus } from '../model/learnOrderStatus'
import { learnPaymentStatus } from '../model/learnPaymentStatus'
import { learnPaymentMethod } from '../model/learnPaymentMethod'
import EditField from './EditField'
import { learnDeliveryType } from '../model/learnDeliveryType'
import { approveOrder } from '../model/approveOrder'
import { useWebSocket } from '@/app/src/shared/contexts/WebSocketContext'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { rejectOrder } from '../model/rejectOrder'

interface Props {
	order: IOrder
}

const Order = ({ order }: Props) => {
	const userId = useUserStore(state => state.id)
	const role = useAuthStore(state => state.role)
	const [isEdit, setIsEdit] = useState(false)
	const [amount, setAmount] = useState('')
	const [percentPrepaymentAmount, setPercentPrepaymentAmount] = useState('')

	const socket = useWebSocket()

	const handleApproveOrder = () => {
		approveOrder({
			socket: socket!,
			order_id: order.id,
			amount: +amount,
			percent_prepayment_amount: +percentPrepaymentAmount,
			manager_id: userId!,
		})
		setIsEdit(false)
	}
	const handleRejectOrder = () => {
		rejectOrder({ socket: socket!, order_id: order.id, manager_id: userId! })
	}

	return (
		<article className='flex flex-col bg-secondaryBg rounded-[8px] pb-3'>
			<Image src={photoCar} alt='Фотография автомобиля' />
			<h3 className='text-center text-headlines font-medium text-xl mt-3 mb-2'>
				Aston Martin Valiant
			</h3>
			<section className='px-3 flex flex-col gap-3'>
				<Field title='Тип заявки' info='Заказ' />

				<Field title='Статус сделки' info={learnOrderStatus(order.order_status)!} />

				{order.payment_status && (
					<Field title='Статус платежа' info={learnPaymentStatus(order.payment_status)!} />
				)}

				{!isEdit && order.amount && <Field title='Общая сумма' info={String(order.amount)} />}
				{isEdit && (
					<EditField
						title='Общая сумма'
						placeholder='Введите цену'
						unit='P'
						value={amount}
						setValue={value => setAmount(value)}
					/>
				)}

				{!isEdit && order.prepayment_amount && (
					<Field title='Сумма предоплаты' info={String(order.prepayment_amount)} />
				)}
				{isEdit && (
					<EditField
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
				{(order.delivery_address || order.delivery_dealership_id) && (
					<Field
						title='Адрес доставки'
						info={order.delivery_address || String(order.delivery_dealership_id)}
					/>
				)}

				{order.delivery_date && <Field title='Дата доставки' info={order.delivery_date} />}
			</section>

			<div className='flex flex-col my-5 gap-3'>
				{isEdit && role === UserRole.ADMIN && order.order_status === OrderStatus.PENDING && (
					<OrderButton type='primary' action={handleApproveOrder} title='Одобрить' />
				)}
				{role === UserRole.ADMIN && order.order_status === OrderStatus.PENDING && (
					<OrderButton
						type={!isEdit ? 'primary' : 'secondary'}
						action={() => setIsEdit(prev => !prev)}
						title={!isEdit ? 'Редактировать' : 'Отменить редактирование'}
					/>
				)}
				{!isEdit && role === UserRole.ADMIN && order.order_status === OrderStatus.PENDING && (
					<OrderButton type='secondary' action={handleRejectOrder} title='Отклонить' />
				)}
			</div>
		</article>
	)
}

export default Order
