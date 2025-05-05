import { PaymentStatus } from '@/app/src/shared/types/requests'

export function learnPaymentStatus(status: PaymentStatus) {
	if (status === PaymentStatus.AWAITING_PREPAYMENT) return 'Ожидает предоплаты'
	if (status === PaymentStatus.PREPAYMENT_DONE) return 'Предоплата внесена'
	if (status === PaymentStatus.AWAITING_FINAL) return 'Ожидает доплаты'
	if (status === PaymentStatus.PAID) return 'Оплачено'
	if (status === PaymentStatus.DEBT) return 'Задолженность'
	if (status === PaymentStatus.REFUNDED) return 'Предоплата возвращена'
	if (status === PaymentStatus.CANCELED) return 'Заказ отменён до предоплаты'
	if (status === PaymentStatus.FORFEIT) return 'Неустойка'
}
