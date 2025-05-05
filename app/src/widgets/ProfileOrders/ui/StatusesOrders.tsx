import { OrdersStatus } from '@/app/src/shared/types/orders'

interface Props {
	statusOrders: OrdersStatus
	setStatusOrders: (status: OrdersStatus) => void
}

const StatusesOrders = ({ statusOrders, setStatusOrders }: Props) => {
	const getStyles = (status: OrdersStatus) =>
		`text-2xl cursor-pointer ${status === statusOrders ? 'text-accent' : 'text-primary'}`

	return (
		<section className='flex gap-10'>
			<span className={getStyles('active')} onClick={() => setStatusOrders('active')}>
				Активные
			</span>
			<span className={getStyles('completed')} onClick={() => setStatusOrders('completed')}>
				Завершённые
			</span>
			<span className={getStyles('rejected')} onClick={() => setStatusOrders('rejected')}>
				Отменённые
			</span>
		</section>
	)
}

export default StatusesOrders
