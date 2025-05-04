'use client'

import { useOrdersStore } from '@/app/src/shared/model/useOrdersStore'
import Order from '@/app/src/entities/Order/ui/Order'
import StatusesOrders from './StatusesOrders'
import TypeOrders from './TypeOrders'
import { useGetOrders } from '../model/useGetOrders'
import { useAuthStore } from '../../cars'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Orders = () => {
	const userId = useUserStore(state => state.id)
	const role = useAuthStore(state => state.role)
	const setAuthData = useAuthStore(state => state.setAuthData)

	const statusOrders = useOrdersStore(state => state.statusOrders)
	const orders = useOrdersStore(state => state.orders) || []
	const setOrders = useOrdersStore(state => state.setOrders)

	const router = useRouter()

	const {
		data: dataOrders,
		isLoading,
		error,
	} = useGetOrders(statusOrders, role!, role === 'user' ? userId! : undefined)

	useEffect(() => {
		if (error) {
			if (error.response?.status === 401) {
				setAuthData(false, 'no role')
				router.replace('/login')
			}
		}

		if (dataOrders) setOrders(dataOrders)
	}, [dataOrders, error])

	if (isLoading) return <h1 className='text-primary'>Loading...</h1>

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
