'use client'

import React from 'react'
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo'
import ProfileSettings from '../../components/Profile/ProfileSettings/ProfileSettings'
import ProfileSecurity from '../../components/Profile/ProfileSecurity/ProfileSecurity'
import Orders from '@/app/src/widgets/ProfileOrders/ui/Orders'
import AuthProvider from '@/app/src/shared/ui/AuthProvider'
import Reservations from '@/app/src/widgets/ProfileReservations/ui/Reservations'
import { useRequestsStore } from '@/app/src/shared/model/useRequestsStore'
import TypeOrders from '@/app/src/widgets/ProfileOrders/ui/TypeOrders'
import StatusesOrders from '@/app/src/widgets/ProfileOrders/ui/StatusesOrders'
import { easeOut, motion } from 'framer-motion'

const requestsVariants = {
	initial: { opacity: 0, y: 40 },
	animate: { opacity: 1, y: 0 },
}

const page = () => {
	const typeRequests = useRequestsStore(state => state.typeRequests)

	const statusRequests = useRequestsStore(state => state.statusRequests)
	const setStatusRequests = useRequestsStore(state => state.setStatusRequests)

	return (
		<AuthProvider>
			<main className='mt-14 grid grid-cols-1 lg:grid-cols-[430px,520px,auto] gap-6'>
				<ProfileInfo />
				<ProfileSettings />
				<ProfileSecurity />
				<motion.article
					variants={requestsVariants}
					initial='initial'
					animate='animate'
					transition={{ duration: 0.5, ease: easeOut }}
					className='bg-800 rounded-[8px] mb-5 px-7 py-3 col-start-1 col-end-2 lg:col-start-2 lg:col-end-4 row-start-4 row-end-5 lg:row-start-2 lg:row-end-5'
				>
					<header className='py-1 relative'>
						<h2 className='text-2xl font-bold text-400'>Мои заявки</h2>
					</header>

					<div className='my-2 relative'>
						<div className='w-full h-[2px] bg-600'></div>
					</div>

					<section className='flex flex-col lg:flex-row justify-between mt-5'>
						<TypeOrders />
						<StatusesOrders statusOrders={statusRequests} setStatusOrders={setStatusRequests} />
					</section>
					{typeRequests === 'orders' && <Orders />}
					{typeRequests === 'reservations' && <Reservations />}
				</motion.article>
			</main>
		</AuthProvider>
	)
}

export default page
