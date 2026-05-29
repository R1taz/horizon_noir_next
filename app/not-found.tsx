import Link from 'next/link'

export default function NotFound() {
	return (
		<main className='flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center'>
			<p className='text-accent text-9xl font-bold' style={{ letterSpacing: '6px' }}>
				404
			</p>
			<h1 className='text-3xl font-semibold text-300'>Страница не найдена</h1>
			<p className='text-500 text-lg max-w-md'>
				Похоже, такой страницы не существует или она была перемещена.
			</p>
			<Link
				href='/catalog'
				className='rounded-[8px] bg-accent font-bold text-xl text-700 py-2 px-8'
			>
				В каталог
			</Link>
		</main>
	)
}
