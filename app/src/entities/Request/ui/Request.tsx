import {
	PaymentMethod,
	PaymentStatus,
	RefundStatus,
	RequestStatus,
} from '@/app/src/shared/types/requests'
import Field from './Field'
import { learnOrderStatus } from '../model/learnOrderStatus'
import { learnPaymentStatus } from '../model/learnPaymentStatus'
import { formatPrice } from '@/app/src/shared/lib/format/formatPrice'
import { learnPaymentMethod } from '../model/learnPaymentMethod'
import { formatDateTime } from '@/app/src/shared/lib/format/formatDateTime'
import { learnRefundStatus } from '../model/learnRefundStatus'

interface Props {
	isEdit?: boolean
	mainPhotoUrl: string
	brandName: string
	modelName: string
	paymentStatus?: PaymentStatus
	paymentMethod: PaymentMethod
	requestStatus: RequestStatus
	amount?: number
	prepaymentAmount?: number
	titleDeliveryDate: string
	deliveryDate?: string
	refundAmount?: number
	refundStatus?: RefundStatus
	children?: React.ReactNode
}

const Request = (props: Props) => {
	return (
		<article className='flex flex-col bg-secondaryBg rounded-[8px] pb-3'>
			<img
				src={
					process.env.NEXT_PUBLIC_BASE_BACKEND_URL + '/' + props.mainPhotoUrl.replace(/\\/g, '/')
				}
				alt='Фотография автомобиля'
			/>

			<h3 className='text-center text-headlines font-medium text-xl mt-3 mb-2'>
				{props.brandName} {props.modelName}
			</h3>

			<section className='px-3 flex flex-col gap-3'>
				<Field title='Тип заявки' info='Заказ' />
				<Field title='Статус сделки' info={learnOrderStatus(props.requestStatus)!} />
				{props.paymentStatus && (
					<Field title='Статус платежа' info={learnPaymentStatus(props.paymentStatus)!} />
				)}
				<Field title='Метод оплаты' info={learnPaymentMethod(props.paymentMethod)!} />

				{props.deliveryDate && (
					<Field title={props.titleDeliveryDate} info={formatDateTime(props.deliveryDate)} />
				)}

				{!props?.isEdit && props.amount && (
					<Field title='Общая сумма' info={formatPrice(props.amount)} />
				)}

				{!props?.isEdit && props.prepaymentAmount && (
					<Field title='Сумма предоплаты' info={formatPrice(+props.prepaymentAmount)} />
				)}

				{props.children}

				{props.refundStatus && (
					<Field title='Статус возврата платежа' info={learnRefundStatus(props.refundStatus)!} />
				)}
				{props.refundAmount && (
					<Field title='Сумма возврата платежа' info={formatPrice(+props.refundAmount)} />
				)}
			</section>
		</article>
	)
}

export default Request
