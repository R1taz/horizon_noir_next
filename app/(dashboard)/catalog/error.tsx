'use client'

import { useEffect } from 'react'

export default function CatalogError({
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
			<h1 className='text-3xl font-semibold text-accent'>Не удалось загрузить каталог</h1>
			<p className='text-500 text-lg max-w-md'>
				Что-то пошло не так при получении списка автомобилей. Попробуйте обновить страницу.
			</p>
			<button
				onClick={reset}
				className='rounded-[8px] bg-accent font-bold text-xl text-700 py-2 px-8'
			>
				Попробовать снова
			</button>
		</main>
	)
}
