'use client'

import { useOrdersStore } from '@/app/src/shared/model/useOrdersStore'
import { useGetOrders } from '../model/useGetOrders'
import { useAuthStore } from '../../cars'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Paginator } from '@/app/src/shared/ui/Paginator'
import { AnimatePresence, easeInOut } from 'framer-motion'
import { motion } from 'framer-motion'
import Order from '@/app/src/entities/Order/ui/Order'
import Skeleton from '@/app/src/shared/ui/Skeleton/Skeleton'
import { useRequestsStore } from '@/app/src/shared/model/useRequestsStore'

const Orders = () => {
	const userId = useUserStore(state => state.id)
	const role = useAuthStore(state => state.role)
	const setAuthData = useAuthStore(state => state.setAuthData)

	const orders = useOrdersStore(state => state.orders) || []
	const setOrders = useOrdersStore(state => state.setOrders)
	const statusRequests = useRequestsStore(state => state.statusRequests)

	const page = useOrdersStore(state => state.page)
	const pageSize = useOrdersStore(state => state.pageSize)
	const portionSize = useOrdersStore(state => state.portionSize)
	const totalCountOrders = useOrdersStore(state => state.totalCountOrders)
	const setTotalCountOrders = useOrdersStore(state => state.setTotalCountOrders)
	const setPage = useOrdersStore(state => state.setPage)

	const router = useRouter()

	const {
		data: dataOrders,
		isLoading,
		error,
	} = useGetOrders(statusRequests, role!, page, pageSize, role === 'user' ? userId! : undefined)

	useEffect(() => {
		if (error) {
			if ((error as any).response?.status === 401) {
				setAuthData(false, 'no role')
				router.replace('/login')
			}
		}

		if (dataOrders) {
			setOrders([...dataOrders.orders].reverse())
			setTotalCountOrders(dataOrders.total)
		}
	}, [dataOrders, error])

	return (
		<>
			<motion.section
				animate={{ height: orders.length === 0 ? 300 : 650 }}
				transition={{ duration: 0.6, ease: easeInOut }}
				className='grid grid-cols-2 gap-8 mt-5 min-h-[300px]'
			>
				{isLoading && (
					<section className='row-start-1 row-end-2 col-start-1 col-end-3'>
						<Skeleton width={1000} height={500} count={2} flow='horizontal' />
					</section>
				)}
				<AnimatePresence mode='popLayout'>
					{orders.map(order => (
						<motion.article
							layout
							key={order.id}
							exit={{ opacity: 0, y: 30 }}
							transition={{ duration: 0.3 }}
						>
							<Order key={order.id} order={order} />
						</motion.article>
					))}
				</AnimatePresence>
			</motion.section>

			<Paginator
				page={page}
				totalCountPages={Math.ceil(totalCountOrders / pageSize)}
				portionSize={portionSize}
				changePage={setPage}
			/>
		</>
	)
}

export default Orders
