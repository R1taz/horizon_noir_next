import { OrderStatus } from '@/app/src/shared/types/orders'

export function learnOrderStatus(status: OrderStatus) {
	if (status === OrderStatus.PENDING) return 'На рассмотрении'
	if (status === OrderStatus.IN_PROGRESS) return 'В процессе'
	if (status === OrderStatus.COMPLETED) return 'Завершена'
	if (status === OrderStatus.REJECTED) return 'Отклонена'
}
