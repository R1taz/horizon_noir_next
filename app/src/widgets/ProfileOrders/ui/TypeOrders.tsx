import { useRequestsStore } from '@/app/src/shared/model/useRequestsStore'
import { RequestsTypeFilter } from '@/app/src/shared/types/requests'
import Select from '@/app/src/shared/ui/Select'
import { easeInOut, easeOut, motion } from 'framer-motion'

const typeOrdersVariants = {
	initial: { opacity: 0, x: -20 },
	animate: { opacity: 1, x: 0 },
}

const topVariants = {
	initial: { opacity: 0, y: 15 },
	animate: { opacity: 1, y: 0 },
}

const TypeOrders = () => {
	const typeRequests = useRequestsStore(state => state.typeRequests)
	const setTypeRequests = useRequestsStore(state => state.setTypeRequests)

	const typeOptions = [
		{
			label: 'Индивидуальный заказ',
			value: 'orders' as RequestsTypeFilter,
			action: (value: RequestsTypeFilter) => setTypeRequests(value),
		},
		{
			label: 'Бронирование',
			value: 'reservations' as RequestsTypeFilter,
			action: (value: RequestsTypeFilter) => setTypeRequests(value),
		},
	]

	const activeOption = typeOptions.find(type => type.value === typeRequests)

	return (
		<>
			<motion.article
				variants={typeOrdersVariants}
				initial='initial'
				animate='animate'
				transition={{ duration: 0.7, ease: easeInOut }}
				className='relative flex items-center gap-2 rounded-[8px] h-[36px] w-[40%] pl-2 bg-700'
			>
				<motion.span
					variants={topVariants}
					initial='initial'
					animate='animate'
					transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
					className='text-500 px-1'
				>
					Тип заявки
				</motion.span>
				<article className='absolute top-0 left-[105px] w-[240px] z-10'>
					<Select
						bg='700'
						edit={true}
						title={activeOption?.label!}
						value={activeOption?.value!}
						options={typeOptions}
					/>
				</article>
			</motion.article>
		</>
	)
}

export default TypeOrders
