import Image from 'next/image'
import logo from '../../../assets/image.png'

const ProfileInfo = () => {
	return (
		<article className='mr-5 p-4 pb-0 bg-quaternaryBg rounded-[8px] col-start-1 col-end-2 row-start-1 row-end-3'>
			<Image src={logo} alt='Фотография пользователя' className='rounded-t-[5px]' />
			<div className='h-[2px] bg-tertiaryBg'></div>

			<section className='px-5'>
				<div className='py-5'>
					<h2 className='text-2xl font-medium text-primary'>Мой профиль</h2>
					<p className='py-2 text-secondary'>Зарегистрирован 12.04.2025</p>
				</div>

				<div className='flex justify-between py-4 border-b-[2px] border-b-tertiaryBg'>
					<span className='text-primary text-xl'>Александр</span>
					<span className='text-primary text-xl'>+7 (999) 675-77-77</span>
				</div>

				<div className='py-4 border-b border-b-[2px] border-b-tertiaryBg'>
					<span className='text-primary text-xl'>suicide.mercedes@gmail.com</span>
				</div>

				<div className='py-4 border-b border-b-[2px] border-b-tertiaryBg'>
					<span className='text-primary text-xl'>Пользователь</span>
				</div>
			</section>

			<div className='flex flex-col gap-5 px-5 my-7'>
				<button className='bg-accentBg font-bold text-lg py-[5px] text-[#333333] rounded-[8px] block'>
					Выйти из аккаунта
				</button>
				<button className='bg-secondaryBg font-bold text-lg py-[5px] text-accent rounded-[8px] block'>
					Удалить аккаунт
				</button>
			</div>
		</article>
	)
}

export default ProfileInfo
