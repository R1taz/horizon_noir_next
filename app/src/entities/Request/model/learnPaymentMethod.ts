import { PaymentMethod } from '@/app/src/shared/types/requests'

export function learnPaymentMethod(method: PaymentMethod) {
	if (method === PaymentMethod.CARD) return 'Банковской картой'
	if (method === PaymentMethod.CASH) return 'Наличными'
}
