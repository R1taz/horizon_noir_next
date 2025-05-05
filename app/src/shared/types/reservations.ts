import { PaymentMethod } from './requests'
import { RequestStatus } from './requests'

export enum ReservationEvent {
	CREATE = 'NEW_RESERVATION',
	FAIL = 'FAIL_RESERVATION',
	PAYMENT = 'PAYMENT_RESERVATION',
	COMPLETE_PAYMENT = 'COMPLETE_PAYMENT_RESERVATION',
	COMPLETE_REFUND = 'COMPLETE_REFUND_RESERVATION',
	CREATE_CANCEL = 'CREATE_CANCEL_RESERVATION',
}

export interface IReservation {
	id: number
	user_id: number
	main_photo_url: string
	brand_name: string
	model_name: string
	dealership_car_id: number
	created_at: string
	amount: number
	prepayment_amount: number
	payment_method: PaymentMethod
	payment_status: PaymentStatus
	reservation_status: Exclude<RequestStatus, RequestStatus.PENDING>
	reservation_date: string
	refund_status?: 'completed' | 'failed' | 'in_progress'
	refund_amount?: number
	refund_date?: string
	manager_id?: number
	refund_date_created_at?: string
}

enum PaymentStatus {
	AWAITING_PREPAYMENT = 'awaiting_prepayment',
	PREPAYMENT_DONE = 'prepayment_done',
	AWAITING_FINAL = 'awaiting_final',
	PAID = 'paid',
	REFUNDED = 'refunded',
	CANCELED = 'canceled',
}
