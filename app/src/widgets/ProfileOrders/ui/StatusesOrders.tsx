import { RequestsTabFilter } from '@/app/src/shared/types/requests'

interface Props {
	statusOrders: RequestsTabFilter
	setStatusOrders: (status: RequestsTabFilter) => void
}

const StatusesOrders = ({ statusOrders, setStatusOrders }: Props) => {
	const getStyles = (status: RequestsTabFilter) =>
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
