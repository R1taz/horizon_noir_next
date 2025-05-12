'use client'

import { useOrdersStore } from '@/app/src/shared/model/useOrdersStore'
import StatusesOrders from './StatusesOrders'
import TypeOrders from './TypeOrders'
import { useGetOrders } from '../model/useGetOrders'
import { useAuthStore } from '../../cars'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Paginator } from '@/app/src/shared/ui/Paginator'
import Loader from '@/app/assets/loader.svg'
import { AnimatePresence, easeInOut, easeOut } from 'framer-motion'
import { motion } from 'framer-motion'
import Order from '@/app/src/entities/Order/ui/Order'

const ordersVariants = {
	initial: { opacity: 0, y: 40 },
	animate: { opacity: 1, y: 0 },
}

const Orders = () => {
	const userId = useUserStore(state => state.id)
	const role = useAuthStore(state => state.role)
	const setAuthData = useAuthStore(state => state.setAuthData)

	const orders = useOrdersStore(state => state.orders) || []
	const setOrders = useOrdersStore(state => state.setOrders)
	const statusOrders = useOrdersStore(state => state.statusOrders)
	const setStatusOrders = useOrdersStore(state => state.setStatusOrders)

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
	} = useGetOrders(statusOrders, role!, page, pageSize, role === 'user' ? userId! : undefined)

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
		<motion.article
			variants={ordersVariants}
			initial='initial'
			animate='animate'
			transition={{ duration: 0.5, ease: easeOut }}
			className='bg-800 rounded-[8px] mb-5 px-7 py-3 col-start-2 col-end-4 row-start-2 row-end-5'
		>
			<header className='py-1 relative'>
				<h2 className='text-2xl font-bold text-400'>Мои заявки</h2>
			</header>

			<div className='my-2 relative'>
				<div className='w-full h-[2px] bg-600'></div>
			</div>

			<section className='flex justify-between mt-5'>
				<TypeOrders />
				<StatusesOrders statusOrders={statusOrders} setStatusOrders={setStatusOrders} />
			</section>

			<motion.section
				animate={{ height: orders.length === 0 ? 300 : 650 }}
				transition={{ duration: 0.6, ease: easeInOut }}
				className='grid grid-cols-2 gap-8 mt-5 min-h-[300px]'
			>
				{isLoading && <Loader />}
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
		</motion.article>
	)
}

export default Orders
