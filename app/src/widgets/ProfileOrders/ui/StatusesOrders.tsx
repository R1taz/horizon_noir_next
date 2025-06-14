import { RequestsTabFilter } from '@/app/src/shared/types/requests'
import ActiveLine from '@/app/src/shared/ui/ActiveLine'
import { motion } from 'framer-motion'

const statusTextVariants = {
	active: { scale: 1.05 },
	inactive: { scale: 1 },
}

interface Statuses {
	label: string
	value: RequestsTabFilter
}

interface Props {
	statusOrders: RequestsTabFilter
	setStatusOrders: (status: RequestsTabFilter) => void
}

const StatusesOrders = ({ statusOrders, setStatusOrders }: Props) => {
	const statuses: Statuses[] = [
		{ label: 'Активные', value: 'active' },
		{ label: 'Отменённые', value: 'rejected' },
		{ label: 'Завершённые', value: 'completed' },
	]

	return (
		<section className='flex flex-col items-center lg:items-start lg:flex-row gap-7 mt-12 lg:mt-0'>
			{statuses.map(status => (
				<article key={status.label}>
					<motion.article
						initial='inactive'
						animate={status.value === statusOrders ? 'active' : 'inactive'}
						variants={statusTextVariants}
						className={`relative text-2xl cursor-pointer select-none ${
							status.value === statusOrders ? 'text-accent' : 'text-500'
						}`}
						transition={{ duration: 0.3 }}
						onClick={() => setStatusOrders(status.value)}
					>
						<span>{status.label}</span>
						{status.value === statusOrders && <ActiveLine />}
					</motion.article>
				</article>
			))}
		</section>
	)
}

export default StatusesOrders
