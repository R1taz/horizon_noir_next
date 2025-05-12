import { PaymentStatus } from '@/app/src/shared/types/requests'
import { approveOrder } from '../api/approveOrder'
import { failOrder } from '../api/failOrder'
import { rejectOrder } from '../api/rejectOrder'
import { paymentOrder } from '../api/paymentOrder'
import { completePayment } from '../api/completePayment'
import { createCancelOrder } from '../api/createCancelOrder'
import { approveCancelOrder } from '../api/approveCancelOrder'
import { rejectCancelOrder } from '../api/rejectCancelOrder'
import { completeRefund } from '../api/completeRefund'
import { createDebt } from '../api/createDebt'

interface SocketOrderPayload {
	socket: WebSocket
	orderId: number
}

interface FnApproveOrder extends SocketOrderPayload {
	amount: number
	percentPrepaymentAmount: number
	userId: number
	deliveryDate: string
	setEdit: (edit: boolean) => void
	resetEditOrder: () => void
}

export function handleApproveOrder({
	socket,
	orderId,
	amount,
	percentPrepaymentAmount,
	userId,
	deliveryDate,
	resetEditOrder,
	setEdit,
}: FnApproveOrder) {
	approveOrder({
		socket: socket,
		order_id: orderId,
		amount: amount,
		percent_prepayment_amount: percentPrepaymentAmount,
		manager_id: userId,
		delivery_date: new Date(deliveryDate).toISOString(),
	})
	setEdit(false)
	resetEditOrder()
}

interface FnRejectOrder extends SocketOrderPayload {
	userId: number
}

export function handleRejectOrder({ socket, orderId, userId }: FnRejectOrder) {
	rejectOrder({ socket, order_id: orderId, manager_id: userId! })
}

export function handleFailOrder({ socket, orderId }: SocketOrderPayload) {
	failOrder({ socket, order_id: orderId })
}

interface FnPaymentOrder extends SocketOrderPayload {
	paymentStatus: PaymentStatus
}

export function handlePaymentOrder({ socket, orderId, paymentStatus }: FnPaymentOrder) {
	paymentOrder({ socket, order_id: orderId, payment_status: paymentStatus })
}

export function handleCompletePayment({ socket, orderId }: SocketOrderPayload) {
	completePayment({ socket, order_id: orderId })
}

export function handleCancelOrder({ socket, orderId }: SocketOrderPayload) {
	createCancelOrder({ socket, order_id: orderId })
}

export function handleApproveCancelOrder({ socket, orderId }: SocketOrderPayload) {
	approveCancelOrder({ socket, order_id: orderId })
}

export function handleRejectCancelOrder({ socket, orderId }: SocketOrderPayload) {
	rejectCancelOrder({ socket, order_id: orderId })
}

export function handleCompleteRefund({ socket, orderId }: SocketOrderPayload) {
	completeRefund({ socket, order_id: orderId })
}

interface FnCreateDebt extends SocketOrderPayload {
	deliveryAddress: string
	numberParkDay: number
	paymentParkingDay: number
	startParkingDate: string
	endParkingDate: string
	resetEditOrder: () => void
}

export function handleCreateDebt({
	socket,
	orderId,
	deliveryAddress,
	numberParkDay,
	paymentParkingDay,
	startParkingDate,
	endParkingDate,
	resetEditOrder,
}: FnCreateDebt) {
	createDebt({
		socket: socket,
		order_id: orderId,
		car_location: deliveryAddress,
		number_parking_day: numberParkDay,
		payment_parking_day: paymentParkingDay,
		start_parking_date: new Date(startParkingDate).toISOString(),
		end_parking_date: new Date(endParkingDate).toISOString(),
	})
	resetEditOrder()
}
