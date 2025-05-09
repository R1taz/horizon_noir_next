import { DeliveryType } from '@/app/src/shared/types/requests'

export function learnDeliveryType(type: DeliveryType) {
	if (type === DeliveryType.SALON) return 'В салон'
	if (type === DeliveryType.CUSTOM) return 'Свой адрес'
}
