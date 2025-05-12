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
import Image from 'next/image'

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
	refund_message?: string
	children?: React.ReactNode
}

const Request = (props: Props) => {
	return (
		<article className='flex flex-col bg-700 rounded-[8px] pb-3'>
			<article className='relative w-full h-[250px] bg-600 rounded-t-[9px]'>
				<Image
					src={
						process.env.NEXT_PUBLIC_BASE_BACKEND_URL + '/' + props.mainPhotoUrl.replace(/\\/g, '/')
					}
					alt='Фотография автомобиля'
					className='object-cover rounded-t-[8px]'
					fill
				/>
			</article>

			<h3 className='text-center text-300 font-medium text-xl mt-3 mb-2'>
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
				{props.refund_message && <Field title='Причина возврата' info={props.refund_message} />}
			</section>
		</article>
	)
}

export default Request
