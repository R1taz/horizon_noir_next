const ProfileSettings = () => {
	return (
		<article className='bg-800 rounded-[8px] px-5 py-3 col-start-2 col-end-3 row-start-1 row-end-2'>
			<header className='py-1 flex justify-between relative'>
				<h2 className='text-2xl font-medium text-400'>Настройки</h2>
				<span className='text-xl'>Переключатель темы</span>
			</header>

			<div className='my-2 relative'>
				<div className='w-full h-[2px] bg-600'></div>
			</div>

			<article className='my-4'>
				<h3 className='text-400'>Уведомления</h3>
				<div className='flex items-center my-2 gap-3'>
					<div className='bg-700 rounded-[6px] w-[25px] h-[25px] my-1'></div>
					<span className='text-400'>Присылать уведомления на Email</span>
				</div>

				<div className='flex items-center my-2 gap-3'>
					<div className='bg-accent rounded-[6px] w-[25px] h-[25px] my-1'></div>
					<span className='text-400'>Присылать уведомления по SMS</span>
				</div>
			</article>

			<article className='mt-6 mb-12'>
				<h3 className='text-400'>Язык</h3>
				<div className='flex items-center my-2 gap-3'>
					<div className='bg-accent rounded-[50%] w-[25px] h-[25px] my-1'></div>
					<span className='text-400'>Русский</span>
				</div>

				<div className='flex items-center my-2 gap-3'>
					<div className='bg-700 rounded-[50%] w-[25px] h-[25px]'></div>
					<span className='text-400'>English</span>
				</div>
			</article>
		</article>
	)
}

export default ProfileSettings
