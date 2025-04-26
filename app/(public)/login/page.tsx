const page = () => {
	return (
		<main className='grid grid-cols-[230px,auto] grid-rows-[150px,auto] mt-24 px-[90px]'>
			<h1
				style={{ letterSpacing: '2px' }}
				className='text-accent text-4xl font-semibold row-start-1 row-end-2 col-start-1 col-end-2'
			>
				ВОЙТИ
			</h1>

			<article className='row-start-2 row-end-3 col-start-2 col-end-3'>
				<p className='text-secondary text-xl'>Спасибо, что выбрали наш автосалон!</p>
				<p className='text-secondary text-xl mt-5'>
					Вход в личный кабинет откроет вам доступ ко всем возможностям платформы: отслеживание
					истории заявок, управление профилем, избранные автомобили, персональные предложения и
					многое другое.
				</p>

				<div className='flex flex-col gap-9 mt-16'>
					<input
						type='text'
						placeholder='Логин'
						className='block w-[60%] text-secondary  bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3'
					/>
					<input
						type='text'
						placeholder='Пароль'
						className='block w-[60%] text-secondary bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3'
					/>
				</div>

				<p className='text-[#535353] mt-7 text-lg'>
					Забыли пароль?
					<span className='text-accent ml-4 py-[3px] font-bold border-b-[2px] border-b-accentBg'>
						Восстановить
					</span>
				</p>

				<button className='my-8 rounded-[8px] bg-accentBg font-bold text-xl text-[#333333] py-2 w-[320px]'>
					Войти
				</button>

				<p className='my-4 text-[#535353] text-lg'>
					Нет аккаунта?
					<span className='text-accent ml-4 py-[3px] font-bold border-b-[2px] border-b-accentBg'>
						Пройдите регистрацию
					</span>
				</p>
			</article>
		</main>
	)
}

export default page
