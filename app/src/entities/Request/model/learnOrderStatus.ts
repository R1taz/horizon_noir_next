import { RequestStatus } from '@/app/src/shared/types/requests'

export function learnOrderStatus(status: RequestStatus) {
	if (status === RequestStatus.PENDING) return 'На рассмотрении'
	if (status === RequestStatus.IN_PROGRESS) return 'В процессе'
	if (status === RequestStatus.COMPLETED) return 'Завершена'
	if (status === RequestStatus.REJECTED) return 'Отклонена'
}
