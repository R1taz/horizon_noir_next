import Image from 'next/image'
import photoCar from '../../../assets/image.png'

interface Props {
	order: any
}

const Order = ({ order }: Props) => {
	return (
		<article className='flex flex-col bg-secondaryBg rounded-[8px] pb-3'>
			<Image src={photoCar} alt='Фотография автомобиля' />
			<h3 className='text-center text-headlines font-medium text-xl mt-3 mb-2'>
				Aston Martin Valiant
			</h3>
			<section className='px-3 flex flex-col gap-3'>
				<div>
					<span className='text-secondary'>Тип заявки:</span>
					<span className='text-primary ml-1'>Заказ</span>
				</div>

				<div>
					<span className='text-secondary'>Статус сделки:</span>
					<span className='text-primary ml-1'>{order.order_status}</span>
				</div>

				<div>
					<span className='text-secondary'>Статус платежа:</span>
					<span className='text-primary ml-1'>{order.payment_status}</span>
				</div>

				{order.amount && (
					<div>
						<span className='text-secondary'>Общая сумма:</span>
						<span className='text-primary ml-1'>252.000.000 ₽</span>
					</div>
				)}

				<div>
					<span className='text-secondary'>Сумма предоплаты:</span>
					<span className='text-primary ml-1'>126.000.000 ₽</span>
				</div>

				<div>
					<span className='text-secondary'>Метод оплаты:</span>
					<span className='text-primary ml-1'>Банковской картой</span>
				</div>

				<div>
					<span className='text-secondary'>Местоположение:</span>
					<span className='text-primary ml-1'>Неизвестно</span>
				</div>

				<div>
					<span className='text-secondary'>Адрес доставки:</span>
					<span className='text-primary ml-1'>Пресненская наб., 10блокС, Москва</span>
				</div>

				<div>
					<span className='text-secondary'>Дата доставки:</span>
					<span className='text-primary ml-1'>Отсутствует</span>
				</div>
			</section>

			<div className='flex flex-col my-5 gap-3'>
				<button className='w-[75%]  mx-auto p-[5px] font-bold text-center text-headlines bg-accentBg rounded-[8px]'>
					Оплатить
				</button>
				<button className='w-[75%] mx-auto p-[5px] font-bold text-center text-accent border-2 border-accentBg rounded-[8px]'>
					Отменить заказ
				</button>
			</div>
		</article>
	)
}

export default Order
