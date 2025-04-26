import React from 'react'
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo'
import ProfileSettings from '../../components/Profile/ProfileSettings/ProfileSettings'
import ProfileSecurity from '../../components/Profile/ProfileSecurity/ProfileSecurity'
import Orders from '../../components/Profile/ProfileOrders/Orders'

const page = () => {
	return (
		<main className='mt-14 grid grid-cols-[430px,520px,auto] gap-6'>
			<ProfileInfo />
			<ProfileSettings />
			<ProfileSecurity />
			<Orders />
		</main>
	)
}

export default page
