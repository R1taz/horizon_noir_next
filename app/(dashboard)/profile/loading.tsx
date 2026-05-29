export default function ProfileLoading() {
	return (
		<main className='grid lg:grid-cols-[300px_1fr] gap-8 mt-8'>
			<aside className='flex flex-col gap-4'>
				<div className='aspect-square bg-800 rounded-[8px] animate-pulse' />
				<div className='h-12 bg-800 rounded animate-pulse' />
				<div className='h-12 bg-800 rounded animate-pulse' />
			</aside>
			<section className='flex flex-col gap-6'>
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className='h-48 bg-800 rounded-[8px] animate-pulse'
						style={{ animationDelay: `${i * 80}ms` }}
					/>
				))}
			</section>
		</main>
	)
}
