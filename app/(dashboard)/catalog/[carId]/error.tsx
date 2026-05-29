'use client'

import { useEffect } from 'react'

export default function CarDetailError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<main className='flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center'>
			<h1 className='text-3xl font-semibold text-accent'>Не удалось загрузить автомобиль</h1>
			<p className='text-500 text-lg max-w-md'>
				Произошла ошибка при получении данных о машине. Попробуйте ещё раз или вернитесь в каталог.
			</p>
			<div className='flex gap-4'>
				<button
					onClick={reset}
					className='rounded-[8px] bg-accent font-bold text-xl text-700 py-2 px-8'
				>
					Попробовать снова
				</button>
				<a
					href='/catalog'
					className='rounded-[8px] border-2 border-accent text-accent font-bold text-xl py-2 px-8'
				>
					В каталог
				</a>
			</div>
		</main>
	)
}
