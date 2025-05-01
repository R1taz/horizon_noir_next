'use client'

import { useOrdersStore } from '@/app/src/shared/model/useOrdersStore'
import Order from './Order'
import StatusesOrders from './StatusesOrders'
import TypeOrders from './TypeOrders'

const Orders = () => {
	const orders = useOrdersStore(state => state.orders)

	return (
		<article className='bg-quaternaryBg rounded-[8px] px-7 py-3 col-start-2 col-end-4 row-start-2 row-end-5'>
			<header className='py-1 relative'>
				<h2 className='text-2xl font-bold text-primary'>Мои заявки</h2>
			</header>

			<div className='my-2 relative'>
				<div className='w-full h-[2px] bg-tertiaryBg'></div>
			</div>

			<section className='flex justify-between mt-5'>
				<TypeOrders />
				<StatusesOrders />
			</section>

			<section className='grid grid-cols-2 gap-8 mt-5'>
				{orders.map(order => (
					<Order order={order} key={order.id} />
				))}
			</section>
		</article>
	)
}

export default Orders
