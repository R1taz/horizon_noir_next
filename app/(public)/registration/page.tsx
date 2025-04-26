const page = () => {
	return (
		<main className='grid grid-cols-[230px,auto] grid-rows-[150px,auto] mt-24 px-[90px]'>
			<h1
				style={{ letterSpacing: '2px' }}
				className='text-accent text-4xl font-semibold row-start-1 row-end-2 col-start-1 col-end-2'
			>
				ЗАРЕГИСТРИРОВАТЬСЯ
			</h1>

			<article className='row-start-2 row-end-3 col-start-2 col-end-3'>
				<p className='text-secondary text-xl'>
					Присоединяйтесь к нашему автосалону — это больше, чем просто покупка автомобиля.
				</p>
				<p className='text-secondary text-xl mt-5'>
					Регистрация откроет доступ к личному кабинету, где вы сможете сохранять понравившиеся
					модели, записываться на тест-драйвы, управлять своими заявками и получать индивидуальные
					предложения.
				</p>

				<div className='flex flex-col gap-9 mt-16'>
					<input
						type='text'
						placeholder='Имя'
						className='block w-[60%] text-secondary  bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3'
					/>
					<input
						type='text'
						placeholder='Пароль'
						className='block w-[60%] text-secondary bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3'
					/>
					<input
						type='text'
						placeholder='Email'
						className='block w-[60%] text-secondary bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3'
					/>
					<input
						type='text'
						placeholder='Номер телефона'
						className='block w-[60%] text-secondary bg-transparent border-b-tertiaryBg border-b-[2px] text-xl pb-3'
					/>
				</div>

				<div className='flex'>
					<input type='checkbox' className='rounded-[8px] w-[20px] h-[20px]' />
					<p className='text-[#535353] mt-7 text-lg '>Согласие на обработку персональных данных</p>
				</div>

				<button className='mt-12 rounded-[5px] bg-accentBg font-bold text-xl text-[#333333] py-2 w-[320px]'>
					Зарегистрироваться
				</button>

				<p className='my-7 text-[#535353] font-medium text-lg'>
					Аккаунт создан?
					<span className='text-accent ml-4 py-[3px] border-b-[2px] border-b-accentBg font-bold'>
						Войти
					</span>
				</p>
			</article>
		</main>
	)
}

export default page
