import ActiveSessions from './ActiveSessions'
import ChangeSecurity from './ChangeSecurity'

const ProfileSecurity = () => {
	return (
		<article className='bg-800 rounded-[8px] px-5 py-3 col-start-3 col-end-4 row-start-1 row-end-2'>
			<header className='py-1 relative'>
				<h2 className='text-2xl font-medium text-400'>Безопасность</h2>
			</header>

			<div className='my-2 relative'>
				<div className='w-full h-[2px] bg-600'></div>
			</div>

			<ChangeSecurity />
			<ActiveSessions />
		</article>
	)
}

export default ProfileSecurity
