export default function CarDetailLoading() {
	return (
		<main>
			<div className='h-6 w-80 bg-800 rounded mb-8 animate-pulse' />
			<div className='flex flex-col md:flex-row gap-8 md:h-[425px]'>
				<div className='rounded-[8px] bg-800 animate-pulse md:w-[50%] h-full min-h-[300px]' />
				<div className='flex flex-col gap-4 flex-1'>
					<div className='h-8 w-3/4 bg-800 rounded animate-pulse' />
					{Array.from({ length: 8 }).map((_, i) => (
						<div
							key={i}
							className='h-5 w-full bg-800 rounded animate-pulse'
							style={{ animationDelay: `${i * 50}ms` }}
						/>
					))}
				</div>
			</div>
			<div className='h-14 w-full bg-800 rounded mt-5 animate-pulse' />
		</main>
	)
}
