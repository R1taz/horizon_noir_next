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

export type RequestsTabFilter = 'active' | 'completed' | 'rejected'
export type RequestsTypeFilter = 'orders' | 'reservations'

export enum RequestStatus {
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
