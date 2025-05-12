import { useState } from 'react'
import { useAuthStore } from '@/app/src/widgets/cars'
import { IOrder } from '@/app/src/shared/types/orders'
import Request from '../../Request/ui/Request'
import OrderFields from './OrderFields'
import OrderButtons from './OrderButtons'
import { easeOut, motion } from 'framer-motion'

const orderVariants = {
	opacity: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 30 },
}

interface Props {
	order: IOrder
}

const Order = ({ order }: Props) => {
	const role = useAuthStore(state => state.role)
	const [isEdit, setIsEdit] = useState(false)

	return (
		<motion.article
			variants={orderVariants}
			initial='initial'
			animate='animate'
			exit='exit'
			transition={{ duration: 1, ease: easeOut }}
		>
			<Request
				brandName={order.brand_name}
				modelName={order.model_name}
				mainPhotoUrl={order.main_photo_url}
				paymentMethod={order.payment_method}
				requestStatus={order.order_status}
				titleDeliveryDate='Дата доставки'
				amount={order.amount}
				prepaymentAmount={order.prepayment_amount}
				deliveryDate={order.delivery_date}
				paymentStatus={order.payment_status}
				refundStatus={order.refund_status}
				refundAmount={order.refund_amount}
				isEdit={isEdit}
				refund_message={order.refund_message}
			>
				<OrderFields isEdit={isEdit} order={order} role={role!} />
				<OrderButtons isEdit={isEdit} setEdit={setIsEdit} order={order} />
			</Request>
		</motion.article>
	)
}

const MotionOrder = motion(Order)

export default MotionOrder
