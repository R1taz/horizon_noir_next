import React from 'react'

const PaymentMethod = () => {
	return (
		<article className='w-[38%] mx-auto my-12'>
			<h2 className='text-headlines text-xl text-center font-medium'>Выберите способ оплаты</h2>
			<section className='flex justify-between my-3'>
				<div className='flex'>
					<div className='flex bg-accentBg rounded-[50%] w-7 h-7'></div>
					<p className='ms-2 text-primary text-base'>Карта</p>
				</div>

				<div className='flex'>
					<div className='flex bg-secondaryBg rounded-[50%] w-7 h-7'></div>
					<p className='ms-2 text-primary text-base'>Наличные</p>
				</div>
			</section>
		</article>
	)
}

export default PaymentMethod
