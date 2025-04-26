import React from 'react'
import CarDealership from './CarDealership'

const PlaceDelivery = () => {
	const carDealerships = [
		'г. Москва, Новорижское шоссе, 17-й километр, 1',
		'г. Санкт-Петербург, Октябрьская наб., 44',
		'г. Калининград, Осенняя улица, 21',
		'г. Краснодар, улица Старокубанская, 80а',
		'​г. Владивосток, Снеговая улица, 1 ст9',
	]

	return (
		<>
			<article className='w-[40%] mx-auto mt-12 mb-6'>
				<h2 className='text-headlines text-xl text-center font-medium'>Выберите место доставки</h2>
				<section className='flex justify-between my-3'>
					<div className='flex'>
						<div className='flex bg-accentBg rounded-[50%] w-7 h-7'></div>
						<p className='ms-2 text-primary text-base'>В автосалон</p>
					</div>

					<div className='flex'>
						<div className='flex bg-secondaryBg rounded-[50%] w-7 h-7'></div>
						<p className='ms-2 text-primary text-base'>Свой адрес</p>
					</div>
				</section>
			</article>

			<section className='flex flex-col gap-3'>
				{carDealerships.map((carDealerships, idx) => (
					<CarDealership title={carDealerships} key={idx} />
				))}
			</section>
		</>
	)
}

export default PlaceDelivery
