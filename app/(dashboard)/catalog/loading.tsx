export default function CatalogLoading() {
	return (
		<main>
			<div className='h-6 w-64 bg-800 rounded mb-6 animate-pulse' />
			<section className='grid grid-cols-1 md:grid-cols-[210px_1fr] xl:grid-cols-[290px_1fr] gap-6'>
				<aside className='hidden md:flex flex-col gap-3'>
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className='h-9 bg-800 rounded animate-pulse' />
					))}
				</aside>
				<section className='grid sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9'>
					{Array.from({ length: 9 }).map((_, i) => (
						<article
							key={i}
							className='aspect-[4/3] bg-800 rounded-[8px] animate-pulse'
							style={{ animationDelay: `${i * 60}ms` }}
						/>
					))}
				</section>
			</section>
		</main>
	)
}
