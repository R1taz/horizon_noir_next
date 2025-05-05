import { RefundStatus } from '@/app/src/shared/types/requests'

export function learnRefundStatus(status: RefundStatus) {
	if (status === RefundStatus.PENDING) return 'На рассмотрении'
	if (status === RefundStatus.IN_PROGRESS) return 'В процессе'
	if (status === RefundStatus.COMPLETED) return 'Возвращён'
	if (status === RefundStatus.FAILED) return 'Отклонён'
}
