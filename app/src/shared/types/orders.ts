export enum OrderEvent {
	CREATE = 'NEW_ORDER',
	APPROVE = 'APPROVE_ORDER',
	REJECT = 'REJECT_ORDER',
	FAIL = 'FAIL_ORDER',
	PAYMENT = 'MAKING_PAYMENT',
}

export interface IOrder {
	id: number
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
	car_location?: string
	payment_status?: PaymentStatus
	order_status: OrderStatus
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

export enum PaymentMethod {
	CARD = 'card',
	CASH = 'cash',
}

export enum DeliveryType {
	SALON = 'salon',
	CUSTOM = 'custom_address',
}

export enum PaymentStatus {
	AWAITING_PREPAYMENT = 'awaiting_prepayment',
	PREPAYMENT_DONE = 'prepayment_done',
	AWAITING_FINAL = 'awaiting_final',
	PAID = 'paid',
	DEBT = 'debt',
	REFUNDED = 'refunded',
	CANCELED = 'canceled',
	FORFEIT = 'forfeit',
}

export enum OrderStatus {
	PENDING = 'pending',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
	REJECTED = 'rejected',
}

export enum RefundStatus {
	PENDING = 'pending',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
	FAILED = 'failed',
}
