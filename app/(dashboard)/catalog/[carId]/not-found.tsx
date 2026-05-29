import Link from 'next/link'

export default function CarNotFound() {
	return (
		<main className='flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center'>
			<h1 className='text-4xl font-semibold text-accent'>Автомобиль не найден</h1>
			<p className='text-500 text-lg max-w-md'>
				Этот автомобиль уже продан, снят с продажи или ссылка устарела. Посмотрите другие модели в
				нашем каталоге.
			</p>
			<Link
				href='/catalog'
				className='rounded-[8px] bg-accent font-bold text-xl text-700 py-2 px-8'
			>
				Перейти в каталог
			</Link>
		</main>
	)
}
