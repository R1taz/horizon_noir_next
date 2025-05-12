import { DeliveryType, PaymentMethod, PaymentStatus, RefundStatus, RequestStatus } from './requests'

export enum OrderEvent {
	CREATE = 'NEW_ORDER',
	APPROVE = 'APPROVE_ORDER',
	REJECT = 'REJECT_ORDER',
	FAIL = 'FAIL_ORDER',
	PAYMENT = 'PAYMENT_ORDER',
	COMPLETE_PAYMENT = 'COMPLETE_PAYMENT_ORDER',
	COMPLETE_REFUND = 'COMPLETE_REFUND_ORDER',
	CREATE_CANCEL = 'CREATE_CANCEL_ORDER',
	APPROVE_CANCEL = 'APPROVE_CANCEL_ORDER',
	REJECT_CANCEL = 'REJECT_CANCEL_ORDER',
	CREATE_DEBT = 'CREATE_DEBT',
	ADD_DAY_FEE = 'ADD_DAY_FEE',
}

export interface IOrder {
	id: number
	brand_name: string
	model_name: string
	main_photo_url: string
	user_id: number
	car_id?: number
	model_id?: number
	brand_id?: number
	color_id?: number
	manufacturer_date?: number
	order_at?: string
	created_at?: string
	amount?: number
	prepayment_amount?: number
	payment_method: PaymentMethod
	delivery_date?: string
	delivery_type: DeliveryType
	delivery_address?: string
	delivery_dealership_id?: number
	dealership_address?: string
	car_location?: string
	payment_status?: PaymentStatus
	order_status: RequestStatus
	refund_status?: RefundStatus
	refund_amount?: number
	refund_date?: string
	manager_id?: number
	order_complete_date?: string
	payment_parking_day?: number
	number_parking_day?: number
	start_parking_date?: string
	end_parking_date?: string
	refund_message?: string
	refund_date_created_at?: string
}

export interface ICurrentEditOrder {
	amount: string
	percentPrepaymentAmount: string
	deliveryAddress: string
	deliveryDate: string
	numberParkDay: string
	paymentParkingDay: string
	startParkingDate: string
	endParkingDate: string
}
