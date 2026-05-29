import Link from 'next/link'

// Minimal landing — full premium landing will be built in Phase 7.
export default function Home() {
	return (
		<main className='flex flex-col items-center justify-center min-h-[75vh] gap-8 text-center'>
			<h1
				className='text-5xl md:text-7xl font-bold text-accent'
				style={{ letterSpacing: '4px' }}
			>
				HORIZON NOIR
			</h1>
			<p className='text-500 text-xl md:text-2xl max-w-2xl'>
				Премиум-автосалон. Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz и Audi в наличии.
				Покупка с доставкой и резервирование в дилерствах Москвы, Санкт-Петербурга, Минска и
				Алматы.
			</p>
			<div className='flex gap-4 mt-4'>
				<Link
					href='/catalog'
					className='rounded-[8px] bg-accent font-bold text-xl text-700 py-3 px-10'
				>
					Перейти в каталог
				</Link>
			</div>
		</main>
	)
}
