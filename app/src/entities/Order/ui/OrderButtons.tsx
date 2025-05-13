'use client'

import { UserRole } from '@/app/interfaces/userInterface'
import { IOrder } from '@/app/src/shared/types/orders'
import { PaymentStatus, RefundStatus, RequestStatus } from '@/app/src/shared/types/requests'
import RequestButton from '../../Request/ui/RequestButton'
import {
	handleApproveCancelOrder,
	handleApproveOrder,
	handleCancelOrder,
	handleCompletePayment,
	handleCompleteRefund,
	handleCreateDebt,
	handleFailOrder,
	handlePaymentOrder,
	handleRejectCancelOrder,
	handleRejectOrder,
} from '../model/FnHandleOrders'
import { useOrdersStore } from '@/app/src/shared/model/useOrdersStore'
import { useWebSocket } from '@/app/src/shared/contexts/WebSocketContext'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useAuthStore } from '@/app/src/widgets/cars'
import { useNotification } from '@/app/src/shared/hooks/useNotification'

interface Props {
	isEdit: boolean
	setEdit: React.Dispatch<React.SetStateAction<boolean>>
	order: IOrder
}

const OrderButtons = ({ isEdit, setEdit, order }: Props) => {
	const currentEditOrder = useOrdersStore(state => state.currentEditOrder)
	const resetEditOrder = useOrdersStore(state => state.resetCurrentEditOrder)

	const userId = useUserStore(state => state.id)
	const role = useAuthStore(state => state.role)

	const socket = useWebSocket()

	const { setIsOpenNotification, setMessageNotification } = useNotification()

	return (
		<>
			<section className='flex flex-col my-5 gap-3'>
				{isEdit && role === UserRole.ADMIN && order.order_status === RequestStatus.PENDING && (
					<RequestButton
						type='400'
						action={() => {
							if (new Date(currentEditOrder.deliveryDate) < new Date()) {
								setIsOpenNotification(true)
								setMessageNotification(
									'Вы не можете выбрать прошедший день в качестве даты доставки'
								)
								return
							}

							if (!currentEditOrder.percentPrepaymentAmount) {
								setIsOpenNotification(true)
								setMessageNotification('Вы не ввели сумму предоплаты')
								return
							}

							if (!currentEditOrder.deliveryDate) {
								setIsOpenNotification(true)
								setMessageNotification('Вы не ввели дату доставки')
								return
							}

							handleApproveOrder({
								socket: socket!,
								userId: userId!,
								orderId: order.id,
								amount: +currentEditOrder.amount,
								percentPrepaymentAmount: +currentEditOrder.percentPrepaymentAmount,
								deliveryDate: currentEditOrder.deliveryDate,
								resetEditOrder,
								setEdit,
							})
						}}
						title='Одобрить'
					/>
				)}

				{role === UserRole.ADMIN && order.order_status === RequestStatus.PENDING && (
					<RequestButton
						type={!isEdit ? '400' : '500'}
						action={() => setEdit((prev: boolean) => !prev)}
						title={!isEdit ? 'Редактировать' : 'Отменить редактирование'}
					/>
				)}

				{!isEdit && role === UserRole.ADMIN && order.order_status === RequestStatus.PENDING && (
					<RequestButton
						type='500'
						action={() =>
							handleRejectOrder({ socket: socket!, orderId: order.id, userId: userId! })
						}
						title='Отклонить'
					/>
				)}

				{role === UserRole.USER &&
					(order.payment_status === PaymentStatus.AWAITING_PREPAYMENT ||
						order.payment_status === PaymentStatus.AWAITING_FINAL ||
						order.payment_status === PaymentStatus.DEBT) &&
					(!order.refund_status || order.refund_status === RefundStatus.FAILED) && (
						<RequestButton
							title='Оплатить'
							type='400'
							action={() => {
								if (order.payment_status === PaymentStatus.AWAITING_PREPAYMENT) {
									handlePaymentOrder({
										socket: socket!,
										orderId: order.id,
										paymentStatus: PaymentStatus.PREPAYMENT_DONE,
									})
								} else {
									handleCompletePayment({ socket: socket!, orderId: order.id })
								}
							}}
						/>
					)}

				{role === UserRole.USER && order.payment_status === PaymentStatus.AWAITING_PREPAYMENT && (
					<RequestButton
						title='Отменить заказ'
						type='500'
						action={() => handleFailOrder({ socket: socket!, orderId: order.id })}
					/>
				)}

				{((role === UserRole.USER && order.payment_status === PaymentStatus.PREPAYMENT_DONE) ||
					(role === UserRole.USER && order.payment_status === PaymentStatus.AWAITING_FINAL) ||
					(role === UserRole.USER && order.payment_status === PaymentStatus.DEBT)) &&
					(order.refund_status === null || order.refund_status === RefundStatus.FAILED) && (
						<RequestButton
							title='Отменить заказ'
							type='500'
							action={() => handleCancelOrder({ socket: socket!, orderId: order.id })}
						/>
					)}

				{role === UserRole.ADMIN &&
					order.payment_status === PaymentStatus.AWAITING_FINAL &&
					(!order.refund_status || order.refund_status === RefundStatus.FAILED) && (
						<RequestButton
							title='Создать задолженность'
							type='400'
							action={() =>
								handleCreateDebt({
									socket: socket!,
									orderId: order.id,
									deliveryAddress: currentEditOrder.deliveryAddress,
									paymentParkingDay: +currentEditOrder.paymentParkingDay,
									numberParkDay: +currentEditOrder.numberParkDay,
									startParkingDate: currentEditOrder.startParkingDate,
									endParkingDate: currentEditOrder.endParkingDate,
									resetEditOrder,
								})
							}
						/>
					)}

				{role === UserRole.ADMIN && order.refund_status === RefundStatus.PENDING && (
					<>
						<RequestButton
							title='Одобрить возврат'
							type='400'
							action={() => handleApproveCancelOrder({ socket: socket!, orderId: order.id })}
						/>
						<RequestButton
							title='Отклонить возврат'
							type='500'
							action={() => handleRejectCancelOrder({ socket: socket!, orderId: order.id })}
						/>
					</>
				)}

				{role === UserRole.ADMIN && order.refund_status === RefundStatus.IN_PROGRESS && (
					<RequestButton
						title='Совершить возврат'
						type='400'
						action={() => handleCompleteRefund({ socket: socket!, orderId: order.id })}
					/>
				)}
			</section>
		</>
	)
}

export default OrderButtons
