import React from 'react'

const ActiveSessions = () => {
	return (
		<article className='mt-5'>
			<h3 className='text-400'>Активность</h3>

			<div className='flex flex-col mx-3 mt-2'>
				<span className='text-500 mb-1'>Это устройство</span>
				<span className='text-500'>Windows 11, Moscow, Russia</span>
			</div>

			<div className='flex flex-col mx-3 mt-4'>
				<span className='text-500 mb-1'>Другие сеансы</span>
				<span className='text-500'>Android, IPhone 16, Moscow, Russia · Пн</span>
			</div>

			<button className='mt-5 text-center text-lg w-full text-accent'>
				Завершить все активные сеансы
			</button>
		</article>
	)
}

export default ActiveSessions
