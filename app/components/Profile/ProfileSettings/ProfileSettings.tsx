const ProfileSettings = () => {
	return (
		<article className='bg-quaternaryBg rounded-[8px] px-5 py-3 col-start-2 col-end-3 row-start-1 row-end-2'>
			<header className='py-1 flex justify-between relative'>
				<h2 className='text-2xl font-medium text-primary'>Настройки</h2>
				<span className='text-xl'>Переключатель темы</span>
			</header>

			<div className='my-2 relative'>
				<div className='w-full h-[2px] bg-tertiaryBg'></div>
			</div>

			<article className='my-4'>
				<h3 className='text-primary'>Уведомления</h3>
				<div className='flex items-center my-2 gap-3'>
					<div className='bg-secondaryBg rounded-[6px] w-[25px] h-[25px] my-1'></div>
					<span className='text-primary'>Присылать уведомления на Email</span>
				</div>

				<div className='flex items-center my-2 gap-3'>
					<div className='bg-accentBg rounded-[6px] w-[25px] h-[25px] my-1'></div>
					<span className='text-primary'>Присылать уведомления по SMS</span>
				</div>
			</article>

			<article className='mt-6 mb-12'>
				<h3 className='text-primary'>Язык</h3>
				<div className='flex items-center my-2 gap-3'>
					<div className='bg-accentBg rounded-[50%] w-[25px] h-[25px] my-1'></div>
					<span className='text-primary'>Русский</span>
				</div>

				<div className='flex items-center my-2 gap-3'>
					<div className='bg-secondaryBg rounded-[50%] w-[25px] h-[25px]'></div>
					<span className='text-primary'>English</span>
				</div>
			</article>
		</article>
	)
}

export default ProfileSettings
